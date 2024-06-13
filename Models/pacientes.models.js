import Conexion from "../config/conexion.db.js";

class PacienteModels{
    constructor(){
       
    }
    //Modelo para obtener los Pacientes que vana a aprecer en las listas
    getPacientesModel(){
        return new Promise((resolve, reject) => {
        Conexion.query(`select id, nombres, apellidos, telefono, dni from paciente`,
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    }
    //Modelo para Buscar los Pacientes que van a aprecer en las listas
    getByDniModel(dni){
        return new Promise((resolve, reject) => {
        Conexion.query(`select id, nombres, apellidos, telefono,dni from paciente where dni = ?`,[dni],
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    }
    //envio de datos a la BD del registro para crear la cuenta
    addNewPacienteModel(nombres, apellidos, edad,telefono,dni, genero, edoCivil, fchnacimineto, direccion,ocupacion) {
        return new Promise((resolve, reject) => {
          Conexion.query(
            `INSERT INTO paciente (nombres, apellidos, edad,telefono,dni, genero, edoCivil, fchnacimineto, direccion,ocupacion) VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?)`,
            [nombres, apellidos, edad, telefono,dni,genero, edoCivil, fchnacimineto, direccion,ocupacion],
            (err, resultados) => {
              if (err) reject(err);
              else resolve(resultados);
            }
          );
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