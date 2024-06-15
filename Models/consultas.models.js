import Conexion from "../config/conexion.db.js";

class Consultas{
    constructor(){

    }

    getConsultasPaciente(){

    }

    getConsultasUsuario(){
        
    }

    AddNewConsultas(id_historia,fecha, motivo,observacion,diagnostico,tratamiento){
        return new Promise((resolve, reject) => {
            Conexion.query(
                `INSERT INTO consulta ( fecha, motivo_consulta, observacion_consulta) VALUES (?, ?, ?)`,
                [fecha, motivo,observacion],
                (err, resultados) => {
                  let id_consulta = resultados.insertId
                  Conexion.query(
                    `INSERT INTO hc_consultas (id_hisorias, id_consultas) VALUES (?,?)`,
                    [id_historia,id_consulta],
                    (err, resultados) => {
                      Conexion.query(
                        `INSERT INTO tratamiento (id_consulta, descripcion) VALUES (?,?)`,
                        [id_consulta, tratamiento],
                        (err, resultados) => {
                          if (err) reject(err);
                          else resolve(resultados);
                        }
                      );
                      Conexion.query(
                        `INSERT INTO diagnostico (id_consulta, descripcion) VALUES (?,?)`,
                        [id_consulta, diagnostico],
                        (err, resultados) => {
                          if (err) reject(err);
                          else resolve(resultados);
                        }
                      );
                    }
                  );
                })
            }
        )
    }
}

export default Consultas;