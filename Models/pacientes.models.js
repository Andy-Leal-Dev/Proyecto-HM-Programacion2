import Conexion from "../config/conexion.db.js";

class PacienteModels{
    constructor(){
       
    }
    //Modelo para obtener los Pacientes que vana a aprecer en las listas
    getPacientesModel(){
        return new Promise((resolve, reject) => {
        Conexion.query(`select id, Nombres,Apellidos,Cedula,Edad,Telefono from paciente`,
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    }
    //Modelo para Buscar los Pacientes que van a aprecer en las listas
    getByDniModel(dni,tipo){
        return new Promise((resolve, reject) => {
        Conexion.query(`SELECT id,Nombres,Apellidos,Cedula,Edad,Telefono FROM paciente WHERE Cedula = ? AND tipo_paciente = ?;`,[dni, tipo],
            (err, resultados) => {
                if (err) {
                  reject(err)
                }
                else {
                  resolve(resultados)
                  console.log(resultados[0]);
                }
            });
            
        });

    
    }
    //envio de datos a la BD del registro para crear la cuenta
    addNewPacienteModel(tipo,Nombres,Apellidos,Cedula,Edad,Telefono,Ocupacion,Direccion_Completa,Informacion_Adicional,Emergencia,Parentesco,Telefono_Parentesco,Direccion_Parentesco,Pediatrico_Nombres,Pediatrico_Apellidos,Pediatrico_Edad,Pediatrico_Cedula,Pediatrico_Sexo) {
        return new Promise((resolve, reject) => {
          if(tipo == 1){
            Conexion.query(
              `INSERT INTO paciente (tipo_paciente, Nombres,Apellidos,Cedula,Edad,Telefono,Ocupacion,Direccion_Completa,Informacion_Adicional,Emergencia,Parentesco,Telefono_Parentesco,Direccion_Parentesco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [tipo,Nombres,Apellidos,Cedula,Edad,Telefono,Ocupacion,Direccion_Completa,Informacion_Adicional,Emergencia,Parentesco,Telefono_Parentesco,Direccion_Parentesco],
              (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
              }
            );
          } else{
            Conexion.query(
              `INSERT INTO paciente (tipo_paciente, Nombres,Apellidos,Cedula,Edad,Telefono,Ocupacion,Direccion_Completa,Informacion_Adicional,Pediatrico_Nombres,Pediatrico_Apellidos,Pediatrico_Edad,Pediatrico_Cedula,Pediatrico_Sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [tipo,Nombres,Apellidos,Cedula,Edad,Telefono,Ocupacion,Direccion_Completa,Informacion_Adicional,Pediatrico_Nombres,Pediatrico_Apellidos,Pediatrico_Edad,Pediatrico_Cedula,Pediatrico_Sexo],
              (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
              }
            );
          }
        });
      }
      //Medelo para Actulizar los datos del paciente. Como la mayoria de todo no esta listo
      updtePacienteModel(nombre, apellido, cedula, genero, usuario, password, cargo) {
        return new Promise((resolve, reject) => {
          Conexion.query(
            `INSERT INTO usuario (nombre, apellido, cedula, genero, usuario, password, cargo) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, cedula, genero, usuario, password, cargo],
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