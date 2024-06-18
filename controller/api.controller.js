import PacienteModels from "../Models/pacientes.models.js";//Importo el modelo del Paciente donde estan todos los modelos de consultas
import UserModels from "../Models/user.models.js"//Importo el modelo del Paciente donde estan todos los modelos de consultas
import Consultas from "../Models/consultas.models.js"; '../Models/consultas.models.js';
/*
    NOTA: Este controlador Solo va a ser para Crear, editar o Eliminar. Ya que no se tiene que pasar nada a la vista
    en tales caso solo se redigira a hacia ella cuando se cumpla la funcion. 
*/
class Api {
    constructor(){
        this.pacienteModel = new PacienteModels();//Creo una instancia del modelo para usar sus metodos
        this.consultasModel = new Consultas();
        this.getAllPaciente = this.getAllPaciente.bind(this);

        this.addNewConsulta = this.addNewConsulta.bind(this);
        this.addNewPaciente = this.addNewPaciente.bind(this); //Creo una instancia del metodo Para reconocer todas las variables establecidas
    }
    
    //Creo un nuevo paciente
    addNewPaciente(req,res){
        //Le pido al usuario los siguientes datos. Mediante el body en formato JSOn
         const{tipo,Nombres,Apellidos,Cedula,Edad, Sexo,Telefono,Ocupacion,Direccion_Completa,Informacion_Adicional,Emergencia,Parentesco,Telefono_Parentesco,Direccion_Parentesco,Pediatrico_Nombres,Pediatrico_Apellidos,Pediatrico_Edad,Pediatrico_Cedula,Pediatrico_Sexo,
    Personales, Familires, Pediatricos
         }= req.body
         //Uso la instancia del modelo PAciente para obtener el metodo y crear el paciente insertandolo a la base de datos
         this.pacienteModel.addNewPacienteModel(tipo,Nombres,Apellidos,Cedula,Edad,Sexo,Telefono,Ocupacion,Direccion_Completa,Informacion_Adicional,Emergencia,Parentesco,Telefono_Parentesco,Direccion_Parentesco,Pediatrico_Nombres,Pediatrico_Apellidos,Pediatrico_Edad,Pediatrico_Cedula,Pediatrico_Sexo,Personales, Familires, Pediatricos)
         .then(responsePaciente=>{
             res.status(200).send("fino")//Si se crea eniara un estatus 200 al ejs.
         })
         .catch(err => {
             return res.status(500).send(err);//Si no se crea eniara un estatus 500 al ejs.
         })
    }

    //Metodo de la api para crear un anueva conuslta
    addNewConsulta(req,res){
            //Le pido al usuario los siguientes datos. Mediante el body en formato JSOn
         const{id_paciente,fecha, doctor, motivo,observacion,diagnostico,tratamiento}= req.body
        //Uso la instancia del modelo Consulta para obtener el metodo y crear la consulta insertandolo a la base de datos
         this.consultasModel.AddNewConsultas(id_paciente,fecha, doctor, motivo,observacion,diagnostico,tratamiento)
         .then(responseConsulta=>{
             res.status(200).send("fino")
         })
         .catch(err => {
             return res.status(500).send(err);
         })
    }


    getAllPaciente(req, res){
        const id = req.params.id;
        console.log(id)
        this.pacienteModel.getPacientesModel(id).then(responsePaciente=>{
            res.status(200).json(responsePaciente)
        }).catch(err => {
            return res.status(500).send("Error obteniendo los pacientes");//En tal caso dira qu hay un error
        });

    }

   
}

export default Api;