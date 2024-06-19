import Conexion from "../config/conexion.db.js";
import { generarCodigo } from "../config/generateCodes.js";

class PacienteModels{
  constructor(){
     
  }
  
  //Modelo para obtener los Pacientes que van a aprecer en las listas
  getPacienteModel(id){
      return new Promise((resolve, reject) => {
      Conexion.query(`SELECT * FROM paciente JOIN antecedentes on antecedentes.id_paciente = paciente.id WHERE paciente.id = ?`,[id],
          (err, resultados) => {
              if (err) reject(err);
              else resolve(resultados);
          });
      });
  }

  getPacientesModel(currentPage){

    return new Promise((resolve, reject) => {
    Conexion.query(`select id,tipo_paciente, Nombres,Apellidos,Cedula,Edad,Telefono from paciente LIMIT ?, 10`,[(currentPage - 1) * 10],
        (err, resultados) => {
            if (err){console.log(err); reject(err);}
            else{console.log(resolve); resolve(resultados);}
        });
    });
  }
  getTotalPacientesModel(){
    return new Promise((resolve, reject) => {
    Conexion.query(`select COUNT(*) AS total_records from paciente`,
        (err, resultados) => {
            if (err){console.log(err); reject(err);}
            else{
              const totalPages = Math.ceil(resultados[0].total_records / 10); 
              console.log(totalPages);
              resolve(totalPages);}
        });
    });
  }

  //Obtener todos los datos de paciente por su id
  getPacienteByDniModel(id){
    return new Promise((resolve, reject) => {
    Conexion.query(`SELECT * FROM paciente WHERE id = ?`,[id],
        (err, resultados) => {
            if (err) {
              reject(err)
            }
            else {
              resolve(resultados)
            }
        });
        
    });


}
  //Modelo para Buscar los Pacientes que van a aprecer en las listas
  getByDniModel(dni,tipo,CurrentPage){
      return new Promise((resolve, reject) => {
      Conexion.query(`SELECT id,Nombres,Apellidos,Cedula,Edad,Telefono FROM paciente WHERE Cedula = ? AND tipo_paciente = ? LIMIT ?, 10`,[dni, tipo,((CurrentPage - 1) * 10)],
          (err, resultados) => {
              if (err) {
                reject(err)
              }
              else {
                resolve(resultados)
              }
          });
          
      });

  
  }

  //envio de datos a la BD del registro para crear la cuenta
  addNewPacienteModel(tipo,Nombres,Apellidos,Cedula,Edad,Sexo,Telefono,Ocupacion,Direccion_Completa,Informacion_Adicional,Emergencia,Parentesco,Telefono_Parentesco,Direccion_Parentesco,Pediatrico_Nombres,Pediatrico_Apellidos,Pediatrico_Edad,Pediatrico_Cedula,Pediatrico_Sexo,Personales, Familires, Pediatricos ) {
      return new Promise((resolve, reject) => {
        if(tipo == 1){
          Conexion.query(
            `INSERT INTO paciente (
            tipo_paciente, 
            Nombres,
            Apellidos,
            Cedula,
            Edad,
            Sexo,
            Telefono,
            Ocupacion,
            Direccion_Completa,
            Informacion_Adicional,
            Emergencia,Parentesco,
            Telefono_Parentesco,
            Direccion_Parentesco
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
            [tipo,Nombres,Apellidos,Cedula,Edad,Sexo,Telefono,Ocupacion,Direccion_Completa,Informacion_Adicional,Emergencia,Parentesco,Telefono_Parentesco,Direccion_Parentesco],
            (err, resultados) => {
              let codeHc = generarCodigo();
              let id_paciente = resultados.insertId
              Conexion.query(
                `INSERT INTO historiasclinicas (id_paciente,code_hc) VALUES (?, ?)`,
                [id_paciente,codeHc],
                (err, resultados) => {
                  Conexion.query(
                    `INSERT INTO antecedentes (id_paciente,Personales, Familires) VALUES (?, ?, ?)`,
                    [id_paciente,Personales, Familires],
                    (err, resultados) => {
                      if (err) reject(err);
                      else resolve(resultados);
                    }
                  );
                }
              );

            }
          );
        } else{
          Conexion.query(
            `INSERT INTO paciente (tipo_paciente,Nombres,Apellidos,Cedula,Edad,Sexo,Telefono,Ocupacion,Parentesco,Telefono_Parentesco,Direccion_Parentesco,Pediatrico_Nombres,Pediatrico_Apellidos,Pediatrico_Edad,Pediatrico_Cedula,Pediatrico_Sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [tipo,Nombres,Apellidos,Cedula,Edad,Sexo,Telefono,Ocupacion,Parentesco,Telefono_Parentesco,Direccion_Parentesco,Pediatrico_Nombres,Pediatrico_Apellidos,Pediatrico_Edad,Pediatrico_Cedula,Pediatrico_Sexo],
            (err, resultados) => {
              console.log(err);
              console.log(resultados);
              let codeHc = generarCodigo();
              let id_paciente = resultados.insertId
              Conexion.query(
                `INSERT INTO historiasclinicas (id_paciente,code_hc) VALUES (?, ?)`,
                [id_paciente,codeHc],
                (err, resultados) => {
                  Conexion.query(
                    `INSERT INTO antecedentes (id_paciente,Personales, Familires, Pediatricos) VALUES (?, ?, ?,?)`,
                    [id_paciente,Personales, Familires, Pediatricos],
                    (err, resultados) => {
                      if (err) reject(err);
                      else resolve(resultados);
                    }
                  );
                }
              );
            }
          );
        }

        
      });
  }

    //Medelo para Actulizar los datos del paciente. Como la mayoria de todo no esta listo
    updtePacienteModel() {
      return new Promise((resolve, reject) => {
        Conexion.query(
          `UPDATE paciente SET Nombres = ?,Apellidos = ?, Cedula = ?, Edad = ?,Sexo = ?, Telefono = ?, Ocupacion = ?, Direccion_Completa = ?,Informacion_Adicional = ?, Emergencia = ?, Parentesco = ?,Telefono_Parentesco = ?,Direccion_Parentesco = ?,Pediatrico_Nombres = ?, Pediatrico_Apellidos = ?, Pediatrico_Cedula = ?, Pediatrico_Edad = ? , Pediatrico_Sexo = ? WHERE id = ?`,
          [],
          (err, resultados) => {
            if (err) reject(err);
            else resolve({ id: resultados.insertId, cargo: cargo });
          }
        );
      });
    }
    //Medelo para Eliminar al Paciente. Como la mayoria de todo no esta listo
    deletePacienteModel(id) {
      return new Promise((resolve, reject) => {
        Conexion.query(
          `DELETE FROM paciente WHERE paciente.id = ?`,
          [id],
          (err, resultados) => {
            if (err) reject(err);
            else resolve(resultados);
          }
        );
      });
    }
    
}

export default PacienteModels;

