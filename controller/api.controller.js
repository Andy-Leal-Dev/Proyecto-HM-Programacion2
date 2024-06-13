import PacienteModels from "../Models/pacientes.models.js";//Importo el modelo del Paciente donde estan todos los modelos de consultas
import UserModels from "../Models/user.models.js"//Importo el modelo del Paciente donde estan todos los modelos de consultas

/*
    NOTA: Este controlador Solo va a ser para Crear, editar o Eliminar. Ya que no se tiene que pasar nada a la vista
    en tales caso solo se redigira a hacia ella cuando se cumpla la funcion. 
*/
class Api {
    constructor(){
        this.pacienteModel = new PacienteModels();//Creo una instancia del modelo para usar sus metodos
        this.addNewPaciente = this.addNewPaciente.bind(this); //Creo una instancia del metodo Para reconocer todas las variables establecidas
    }
    
    //Creo un nuevo paciente NOTA: Creo que esta fallando. pero es una prueba mientras me das todo los datoa s ingresar y se tiene la vista
    addNewPaciente(req,res){
        //Le pido al usuario los siguientes datos. Mediante el body en formato JSOn
         const{nombres, apellidos, edad,telefono,dni, genero, edoCivil, fchnacimineto, direccion,ocupacion}= req.body
         //Uso la instancia del modelo PAciente para obtener el metodo y crear el paciente insertandolo a la base de datos
         this.pacienteModel.addNewPacienteModel(nombres, apellidos, edad,telefono,dni, genero, edoCivil, fchnacimineto, direccion,ocupacion)
         .then(responsePaciente=>{
             res.status(200).send('Paciente creado');//Si se crea eniara un estatus 200 al ejs.
         })
         .catch(err => {
             return res.status(500).send(err);//Si no se crea eniara un estatus 500 al ejs.
         })
    }

 
}


export default Api;