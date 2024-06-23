import PacienteModels from "../Models/pacientes.models.js"; //Importo el modelo del Paciente donde estan todos los modelos de consultas
import UserModels from "../Models/user.models.js"; //Importo el modelo del Paciente donde estan todos los modelos de consultas
import Consultas from "../Models/consultas.models.js";
import { generateTokens } from "../config/TokenManger.js";
import {hashPassword,comparePasswords} from "../config/hashPassword.js"
/*
    NOTA: Este controlador Solo va a ser para Crear, editar o Eliminar. Ya que no se tiene que pasar nada a la vista
    en tales caso solo se redigira a hacia ella cuando se cumpla la funcion. 
*/
class Api {
  constructor() {
    this.pacienteModel = new PacienteModels(); //Creo una instancia del modelo para usar sus metodos
    this.consultasModel = new Consultas();
    this.userModel = new UserModels();
    this.signUpUser = this.signUpUser.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.deleteUsuario = this.deleteUsuario.bind(this);
    this.deletePaciente = this.deletePaciente.bind(this);
    this.updatePaciente = this.updatePaciente.bind(this);
    this.addNewConsulta = this.addNewConsulta.bind(this);
    this.addNewPaciente = this.addNewPaciente.bind(this); //Creo una instancia del metodo Para reconocer todas las variables establecidas
  }

  //Creo un nuevo paciente
  addNewPaciente(req, res) {
    //Le pido al usuario los siguientes datos. Mediante el body en formato JSOn
    const {
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
      Pediatricos,
    } = req.body;
    //Uso la instancia del modelo PAciente para obtener el metodo y crear el paciente insertandolo a la base de datos
    this.pacienteModel
      .addNewPacienteModel(
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
      )
      .then((responsePaciente) => {
        res.status(200).send("fino"); //Si se crea eniara un estatus 200 al ejs.
      })
      .catch((err) => {
        return res.status(500).send(err); //Si no se crea eniara un estatus 500 al ejs.
      });
  }

  updatePaciente(req, res) {
    const {
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
      Pediatricos,
    } = req.body;

    this.pacienteModel
      .updtePacienteModel(
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
      )
      .then((responsePaciente) => {
        console.log(responsePaciente);
        res.status(200).send("fino"); //Si se crea eniara un estatus 200 al ejs.
      })
      .catch((err) => {
        return res.status(500).send(err); //Si no se crea eniara un estatus 500 al ejs.
      });
  }

  deletePaciente(req, res) {
    const id = req.params.id;
    this.pacienteModel
      .deletePacienteModel(id)
      .then((responsePaciente) => {
        return res.status(200).send("fino");
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  }
  //Metodo de la api para crear un anueva conuslta
  addNewConsulta(req, res) {
    //Le pido al usuario los siguientes datos. Mediante el body en formato JSOn
    const {
      id_paciente,
      fecha,
      doctor,
      motivo,
      observacion,
      diagnostico,
      tratamiento,
    } = req.body;
    //Uso la instancia del modelo Consulta para obtener el metodo y crear la consulta insertandolo a la base de datos
    this.consultasModel
      .AddNewConsultas(
        id_paciente,
        fecha,
        doctor,
        motivo,
        observacion,
        diagnostico,
        tratamiento
      )
      .then((responseConsulta) => {
        return res.status(200).send("fino");
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  }

   //Controlador pra inicar sesion
   logInUser(req, res){
    const{usuario,password}= req.body

    this.userModel.getByUserModel(usuario).then(async responseUser=>{

        //Guardo la contraseña obtenida en una variable para mejor manejo
       const passwordHashed = responseUser[0].password
       //comparo las contraseñas con la Funcion ComparePassword
       const MachtPassword = await comparePasswords(password, passwordHashed)
            //Si la contraseña es correcta se va a crear el JWT
            if(MachtPassword){
                const jwt = generateTokens(responseUser[0].id,responseUser[0].cargo)
                res.cookie("jwt",`${jwt}`,{httpOnly: true, secure: true,   sameSite: 'strict' });//se evia al ejs. Nota: esta parte tengo que pasarla como Cookie.
                res.status(200).send('Login successful');
            } else{ //Si la contrseña no es correcta hay que mostrar algo en pantalla
                return res.status(500).send(err);
            }
      
        })
        .catch(err => {
        return res.status(500).send(err);
        })
    }

    //Controlador del registro
    async signUpUser(req,res){
        //Pido al ejs los datos para el registro
        const{nombre,apellido,cedula,Telefono,genero,usuario,password,cargo}= req.body
        //Encripto la contraseña usando la funcion HashPassword
        const passwordHashed = await hashPassword(password);
        //Uso el modelo SignUP Para insertar todo los datos con la constraseña encriptada y creo la cuenta
        this.userModel.signUpUserModel(nombre,apellido,cedula,Telefono,genero,usuario,passwordHashed,cargo)
        .then(responseUser=>{
          console.log(responseUser);
          if(responseUser == 1){
            return res.status(302).send('Usuario ya existe');
          } else{
            const jwt = generateTokens(responseUser[0].id,responseUser[0].cargo) //Nota: esto lo hacemos para manejar solo la informacion necesaria en los ejs y para validar el acceso de los doctores y secretarias a ciertas rutas
            res.cookie("JWT",jwt,{httpOnly: true, secure: true,   sameSite: 'strict' });
            res.status(200).send('Login successful');
          }
        })
        .catch(err => {
            return res.status(200).send(err);
        })

    }

    deleteUsuario(req, res) {
        const id = req.params.id;
        this.userModel.deleteUsuarioModel(id)
          .then((responsePaciente) => {
            return res.status(200).send("fino");
          })
          .catch((err) => {
            return res.status(500).send(err);
          });
      }
}

export default Api;
