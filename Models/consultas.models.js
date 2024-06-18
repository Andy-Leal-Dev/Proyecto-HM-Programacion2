import Conexion from "../config/conexion.db.js";

class Consultas{
    constructor(){}

    //Obtiene todas las consultas de un paciente en especifico por su id
    getConsultasPaciente(id){
      return new Promise((resolve, reject) => {
        Conexion.query(`SELECT consulta.id, consulta.fecha, consulta.motivo_consulta FROM consulta
                        JOIN hc_consultas ON hc_consultas.id_consultas = consulta.id
                        JOIN historiasclinicas ON historiasclinicas.id = hc_consultas.id_hisorias
                        JOIN paciente ON paciente.id = historiasclinicas.id_paciente WHERE paciente.id = ?`,[id],
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    }

    //Obtiene toda la consulta cons su tratamiento y diagnostico
    getConsulta(id){
      return new Promise((resolve, reject) => {
        Conexion.query(`SELECT * FROM consulta JOIN diagnostico ON diagnostico.id_consulta = consulta.id JOIN tratamiento ON tratamiento.id_consulta = consulta.id WHERE consulta.id = ?`,[id],
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    }
    
    //Medotodo para crear las consultas. Esta peticion tiene 4 consultas a la base de datos por sus relaciones
    AddNewConsultas(id_paciente,fecha, doctor, motivo,observacion,diagnostico,tratamiento){
        return new Promise((resolve, reject) => {
            Conexion.query(`SELECT id FROM historiasclinicas WHERE id_paciente = ?`,
              [id_paciente],(err,resultados)=>{
                console.log(resultados);
                let id_hisoria = resultados[0].id
              Conexion.query(
                `INSERT INTO consulta ( fecha, doctor, motivo_consulta, observacion_consulta) VALUES (?, ?, ?,?)`,
                [fecha, doctor,motivo,observacion],
                (err, resultados) => {
                  let id_consulta = resultados.insertId
                  Conexion.query(
                    `INSERT INTO hc_consultas (id_hisorias, id_consultas) VALUES (?,?)`,
                    [id_hisoria,id_consulta],
                    (err, resultados) => {
                      Conexion.query(
                        `INSERT INTO tratamiento (id_consulta, descripcion_tratamiento) VALUES (?,?)`,
                        [id_consulta, tratamiento],
                        (err, resultados) => {
                          if (err) reject(err);
                          else resolve(resultados);
                        }
                      );
                      Conexion.query(
                        `INSERT INTO diagnostico (id_consulta, descripcion_diagnostico) VALUES (?,?)`,
                        [id_consulta, diagnostico],
                        (err, resultados) => {
                          if (err) reject(err);
                          else resolve(resultados);
                        }
                      );
                    }
                  );
                })
            })
            }
        )
    }


}

export default Consultas;