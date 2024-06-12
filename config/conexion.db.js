import mysql from 'mysql';
//La conexion a la base de datos
const mysqlConexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "clinica"
});

//Mostrar si se pudo conectar a la base de datos
mysqlConexion.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      // Optionally throw an exception to propagate the error
      throw new Error("MySQL connection failed");
    } else {
      console.log("Successfully connected to MySQL!");
      // Release the connection or use connection pool management as needed
      connection.release();
    }
  });
export default mysqlConexion;