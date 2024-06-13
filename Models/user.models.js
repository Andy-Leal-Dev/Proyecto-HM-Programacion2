import Conexion from "../config/conexion.db.js";

class UserModels{
    constructor(){
       
    }
    //peticiona la BD Que obtenga el id, cargo y contraseña del usuario que ingresa el usuario
    getByUserModel(usuario){
        return new Promise((resolve, reject) => {
        Conexion.query(`select id,password, cargo from usuario where usuario = ?`,[usuario],
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    }
    //envio de datos a la BD del registro para crear la cuenta
    signUpUserModel(nombre, apellido, cedula, genero, usuario, password, cargo) {
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
      //Peticion para obtener todos los usuarios que aparecen en la lista (Solo lo puede obtener el admin)
      getUsersModel(){
        return new Promise((resolve, reject) => {
        Conexion.query(`select nombre, apellido, cedula, cargo from usuario`,
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    }
    //Despues de comentar y subir esto me monto es la busqueda de usuarios
}

export default UserModels;