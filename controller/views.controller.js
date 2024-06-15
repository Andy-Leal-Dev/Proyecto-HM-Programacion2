import { VerifyTokenConvertId } from "../config/TokenManger.js"; //Importamos la funcion que nos convierte el JWT al Rol O Id
import PacienteModels from "../Models/pacientes.models.js"; //Importamos El modelo Paciente para Obtener los medodo Para obtener los datos o bascar Datos y Mostrarlos
import UserModels from "../Models/user.models.js";//Importamos El modelo Usuario para Obtener los medodo Para obtener los datos o buscar Datos  y Mostrarlos
class Views{
    constructor(){
        this.pacienteModel = new PacienteModels();//Creamos una instancia del Modelo Paciente para Obtener Todos sus metodos
        this.userModel = new UserModels();//Creamos una instancia del Modelo Usuario para Obtener Todos sus metodos
        this.viewPaciente = this.viewPaciente.bind(this);
        this.viewUsuarios = this.viewUsuarios.bind(this);
        this.searchPaciente = this.searchPaciente.bind(this);
    }


    //Vista de Inicio En este caso el de Pacientes
    viewPaciente(req,res){
        const token = req.cookies.jwt;//Obtengo el JWt de las cookies
        const Rol = VerifyTokenConvertId(token);//Convierto ese JWT para obtener el rol de Usuario y asi validar sus vistas
        //Le pido al modelo todos los Pacientes para mostrarlos en la vista
        this.pacienteModel.getPacientesModel().then(responsePaciente=>{
            res.render("Paciente.ejs",{ //Si se obtiene me renderisa(Muestra) la vista de Paciente.ejs
                Rol, //Le paso a la vista el rol para validar lo que puede ver y usar
                pacientes:responsePaciente //Le paso a la vista todos los pacientes en la base de datos
            });
        }).catch(err => {
            return res.status(500).send("Error obteniendo los pacientes");//En tal caso dira qu hay un error
        });
        
    }

    //Vista de Paciente Buscado. Esta vista mostrara unicamente el o los paciente que se quiere buscar
    searchPaciente(req,res){
        const token = req.cookies.jwt;
        
        const Rol = VerifyTokenConvertId(token);
       
        console.log(req.params.dni,req.params.tipo); 
        this.pacienteModel.getByDniModel(req.params.dni,req.params.tipo) 
        .then(async (responsePaciente) => {
            res.render("Paciente.ejs", {
              Rol,
              pacientes: responsePaciente
            });
          })
        .catch(err => {
            return res.status(500).send(err);//En tal caso dira qu hay un error
        })
   }

    //Vista de Usuarios. Esta vista solo tiene acceso los Admins 
    viewUsuarios(req,res){
        const token = req.cookies.jwt;//Obtengo el JWt de las cookies
        const Rol = VerifyTokenConvertId(token);//Convierto ese JWT para obtener el rol de Usuario y asi validar sus vistas
        //Le pido al modelo todos los Usuarios para mostrarlos en la vista
        this.userModel.getUsersModel().then(responseUser => {
            res.render("Usuarios.ejs",{ //Si se obtiene me renderisa(Muestra) la vista de Usuarios.ejs
                Rol, //Le paso a la vista el rol para validar lo que puede ver y usar
                usuarios:responseUser//Le paso a la vista todos los Usuarios en la base de datos
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo productos");
        });
        
    }
    //Vista de los perfiles. Nota: Haz lo que se te ocurra. cuando se trate pasar la informacion me dices para hacerlo.
    viewProfile(req,res){
        const token = req.cookies.jwt;
        const Rol = VerifyTokenConvertId(token);
        res.render("Profile.ejs",{Rol});
    }


    
}

export default Views