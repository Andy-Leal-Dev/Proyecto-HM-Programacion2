import Conexion from "../config/conexion.db.js";
import { generarCodigo } from "../config/generateCodes.js";

class PacienteModels {
  constructor() {}

  //Modelo para obtener los Pacientes que van a aprecer en las listas
  getPacienteModel(id) {
    return new Promise((resolve, reject) => {
      Conexion.query(
        `SELECT * FROM paciente JOIN antecedentes on antecedentes.id_paciente = paciente.id WHERE paciente.id = ?`,
        [id],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        }
      );
    });
  }

  getPacientesModel(currentPage) {
    return new Promise((resolve, reject) => {
      Conexion.query(
        `select id,tipo_paciente, Nombres,Apellidos,Cedula,Edad,Telefono from paciente LIMIT ?, 10`,
        [(currentPage - 1) * 10],
        (err, resultados) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(resultados);
          }
        }
      );
    });
  }
  getTotalPacientesModel() {
    return new Promise((resolve, reject) => {
      Conexion.query(
        `select COUNT(*) AS total_records from paciente`,
        (err, resultados) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            const totalPages = Math.ceil(resultados[0].total_records / 10);
            resolve(totalPages);
          }
        }
      );
    });
  }

  //Obtener todos los datos de paciente por su id
  getPacienteByDniModel(id) {
    return new Promise((resolve, reject) => {
      Conexion.query(
        `SELECT * FROM paciente WHERE id = ?`,
        [id],
        (err, resultados) => {
          if (err) {
            reject(err);
          } else {
            resolve(resultados);
          }
        }
      );
    });
  }
  //Modelo para Buscar los Pacientes que van a aprecer en las listas
  getByDniModel(dni, tipo, CurrentPage) {
    return new Promise((resolve, reject) => {
      Conexion.query(
        `SELECT id,Nombres,Apellidos,Cedula,Edad,Telefono FROM paciente WHERE Cedula = ? AND tipo_paciente = ? LIMIT ?, 10`,
        [dni, tipo, (CurrentPage - 1) * 10],
        (err, resultados) => {
          if (err) {
            reject(err);
          } else {
            resolve(resultados);
          }
        }
      );
    });
  }

  //envio de datos a la BD del registro para crear la cuenta
  addNewPacienteModel(
    tipo,
    Nombres,
    Apellidos,
    Cedula,
    Edad,
    Sexo,
    Telefono,
    Ocupacion,
    Direccion_Completa,
    Informacion_Adicional,
    Emergencia,
    Parentesco,
    Telefono_Parentesco,
    Direccion_Parentesco,
    Pediatrico_Nombres,
    Pediatrico_Apellidos,
    Pediatrico_Edad,
    Pediatrico_Cedula,
    Pediatrico_Sexo,
    Personales,
    Familires,
    Pediatricos
  ) {
    return new Promise((resolve, reject) => {
      if (tipo == 1) {
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
          [
            tipo,
            Nombres,
            Apellidos,
            Cedula,
            Edad,
            Sexo,
            Telefono,
            Ocupacion,
            Direccion_Completa,
            Informacion_Adicional,
            Emergencia,
            Parentesco,
            Telefono_Parentesco,
            Direccion_Parentesco,
          ],
          (err, resultados) => {
            let codeHc = generarCodigo();
            let id_paciente = resultados.insertId;
            Conexion.query(
              `INSERT INTO historiasclinicas (id_paciente,code_hc) VALUES (?, ?)`,
              [id_paciente, codeHc],
              (err, resultados) => {
                Conexion.query(
                  `INSERT INTO antecedentes (id_paciente,Personales, Familires) VALUES (?, ?, ?)`,
                  [id_paciente, Personales, Familires],
                  (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                  }
                );
              }
            );
          }
        );
      } else {
        Conexion.query(
          `INSERT INTO paciente (tipo_paciente,Nombres,Apellidos,Cedula,Edad,Sexo,Telefono,Ocupacion,Parentesco,Direccion_Parentesco,Pediatrico_Nombres,Pediatrico_Apellidos,Pediatrico_Edad,Pediatrico_Cedula,Pediatrico_Sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            tipo,
            Nombres,
            Apellidos,
            Cedula,
            Edad,
            Sexo,
            Telefono,
            Ocupacion,
            Parentesco,
            Direccion_Parentesco,
            Pediatrico_Nombres,
            Pediatrico_Apellidos,
            Pediatrico_Edad,
            Pediatrico_Cedula,
            Pediatrico_Sexo,
          ],
          (err, resultados) => {
            let codeHc = generarCodigo();
            let id_paciente = resultados.insertId;
            Conexion.query(
              `INSERT INTO historiasclinicas (id_paciente,code_hc) VALUES (?, ?)`,
              [id_paciente, codeHc],
              (err, resultados) => {
                Conexion.query(
                  `INSERT INTO antecedentes (id_paciente,Personales, Familires, Pediatricos) VALUES (?, ?, ?,?)`,
                  [id_paciente, Personales, Familires, Pediatricos],
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
  updtePacienteModel(
    id,
    tipo,
    Nombres,
    Apellidos,
    Cedula,
    Edad,
    Telefono,
    Ocupacion,
    Direccion_Completa,
    Informacion_Adicional,
    Emergencia,
    Parentesco,
    Telefono_Parentesco,
    Direccion_Parentesco,
    Pediatrico_Nombres,
    Pediatrico_Apellidos,
    Pediatrico_Edad,
    Pediatrico_Cedula,
    Personales,
    Familires,
    Pediatricos
  ) {
    return new Promise((resolve, reject) => {
      if (tipo == 1) {
        Conexion.query(
          `UPDATE paciente SET
  Nombres = COALESCE(?, Nombres),
  Apellidos = COALESCE(?, Apellidos),
  Cedula = COALESCE(?, Cedula),
  Edad = COALESCE(?, Edad),
  Telefono = COALESCE(?, Telefono),
  Ocupacion = COALESCE(?, Ocupacion),
  Direccion_Completa = COALESCE(?, Direccion_Completa),
  Informacion_Adicional = COALESCE(?, Informacion_Adicional),
  Emergencia = COALESCE(?, Emergencia),
  Parentesco = COALESCE(?, Parentesco),
  Telefono_Parentesco = COALESCE(?, Telefono_Parentesco),
  Direccion_Parentesco = COALESCE(?, Direccion_Parentesco)
WHERE id = ?`,
          [
            Nombres,
            Apellidos,
            Cedula,
            Edad,
            Telefono,
            Ocupacion,
            Direccion_Completa,
            Informacion_Adicional,
            Emergencia,
            Parentesco,
            Telefono_Parentesco,
            Direccion_Parentesco,
            id,
          ],
          (err, resultados) => {
            resolve(resultados);
            /*Conexion.query(
                `UPDATE antecedentes SET Personales = ?,Familires = ?, WHERE id_paciente = ?`,
                [id,Personales, Familires],
                (err, resultados) => {
                  if (err){ console.log(err); reject(err);}
                  else{console.log(resultados); resolve(resultados);}
                }
              );*/
          }
        );
      } else {
        Conexion.query(
          `UPDATE paciente SET 
            Nombres = COALESCE(?, Nombres), 
            Apellidos = COALESCE(?, Apellidos), 
            Cedula = COALESCE(?, Cedula), 
            Edad = COALESCE(?, Edad),  
            Telefono = COALESCE(?, Telefono), 
            Ocupacion = COALESCE(?, Ocupacion), 
            Parentesco = COALESCE(?, Parentesco), 
            Telefono_Parentesco = COALESCE(?, Telefono_Parentesco), 
            Direccion_Parentesco = COALESCE(?, Direccion_Parentesco), 
            Pediatrico_Nombres = COALESCE(?, Pediatrico_Nombres), 
            Pediatrico_Apellidos = COALESCE(?,  Pediatrico_Apellidos), 
            Pediatrico_Edad = COALESCE(?, Pediatrico_Edad), 
            Pediatrico_Cedula = COALESCE(?, Pediatrico_Cedula)
            WHERE id = ?`,
          [
            Nombres,
            Apellidos,
            Cedula,
            Edad,
            Telefono,
            Ocupacion,
            Parentesco,
            Telefono_Parentesco,
            Direccion_Parentesco,
            Pediatrico_Nombres,
            Pediatrico_Apellidos,
            Pediatrico_Edad,
            Pediatrico_Cedula,
            id,
          ],
          (err, resultados) => {
            resolve(resultados);
            /*Conexion.query(
                `UPDATE antecedentes SET Personales = ?,Familires = ?, Pediatricos = ?, WHERE id_paciente = ?`,
                [Personales, Familires, Pediatricos, id],
                (err, resultados) => {
                  if (err){ console.log(err); reject(err);}
                  else{console.log(resultados); resolve(resultados);}
                }
              );*/
          }
        );
      }
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
