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
    signUpUserModel(nombre, apellido, cedula, Telefono, genero, usuario, password, cargo) {
        return new Promise((resolve, reject) => {
          Conexion.query(`select COUNT(*) AS total from usuario where usuario = ?`,[usuario],
            (err, resultados) => {
              console.log(resultados[0].total);
                if (resultados[0].total == 1){ 
                  resolve(resultados[0].total)
                } else {
                  Conexion.query(
                    `INSERT INTO usuario (nombre, apellido, cedula, Telefono,genero, usuario, password, cargo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [nombre, apellido, cedula, Telefono, genero, usuario, password, cargo],
                    (err, resultados) => {
                      if (err) reject(err);
                      else resolve({ id: resultados.insertId, cargo: cargo });
                    }
                  );
                }
            });
         
        });
      }
    getUserModel(id){
        return new Promise((resolve, reject) => {
        Conexion.query(`select * from usuario WHERE id = ?`,[id],
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    }
      //Peticion para obtener todos los usuarios que aparecen en la lista (Solo lo puede obtener el admin)
    getUsersModel(currentPage){
        return new Promise((resolve, reject) => {
        Conexion.query(`select id, nombre, apellido, Telefono, cedula, cargo from usuario LIMIT ?, 10`,[(currentPage - 1) * 10],
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    }

    getTotalUsuarioModel(){
      return new Promise((resolve, reject) => {
      Conexion.query(`select COUNT(*) AS total_records from usuario`,
          (err, resultados) => {
              if (err){ reject(err);}
              else{
                const totalPages = Math.ceil(resultados[0].total_records / 10); 
                resolve(totalPages);}
          });
      });
    }
    //Despues de comentar y subir esto me monto es la busqueda de usuarios
    getUsuarioByDniModel(id){
      return new Promise((resolve, reject) => {
      Conexion.query(`SELECT * FROM usuario WHERE id = ?`,[id],
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
    getByDNIModel(DNI,currentPage){
        return new Promise((resolve, reject) => {
          Conexion.query(`select id, nombre, apellido, cedula, cargo from usuario where cedula = ?  LIMIT ?, 10`,[DNI,(currentPage - 1) * 10],
            (err, resultados) => {
               if (err) reject(err);
              else resolve(resultados);
      });
     });
    }

    deleteUsuarioModel(id) {
      return new Promise((resolve, reject) => {
        Conexion.query(
          `DELETE FROM usuario WHERE id = ?`,
          [id],
          (err, resultados) => {
            if (err){ console.log(err); reject(err);}
            else resolve(resultados);
          }
        );
      });
    }
}

export default UserModels;