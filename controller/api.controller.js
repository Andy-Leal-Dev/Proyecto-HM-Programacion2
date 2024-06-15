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
        this.addNewConsulta = this.addNewConsulta.bind(this);
        this.addNewPaciente = this.addNewPaciente.bind(this); //Creo una instancia del metodo Para reconocer todas las variables establecidas
    }
    
    //Creo un nuevo paciente NOTA: Creo que esta fallando. pero es una prueba mientras me das todo los datoa s ingresar y se tiene la vista
    addNewPaciente(req,res){
        //Le pido al usuario los siguientes datos. Mediante el body en formato JSOn
         const{tipo,Nombres,Apellidos,Cedula,Edad,Telefono,Ocupacion,Direccion_Completa,Informacion_Adicional,Emergencia,Parentesco,Telefono_Parentesco,Direccion_Parentesco,Pediatrico_Nombres,Pediatrico_Apellidos,Pediatrico_Edad,Pediatrico_Cedula,Pediatrico_Sexo,
            Amigdalitis, Asma, Bronquitis, Cancer, Diabetes, Influenza, Enf_Neuromentales, Cardio_Vasculares, Rubeola, Sarampion, Traumatismos, Neumania, Familiar_Artritis, Familiar_Asma, 
            Familiar_Cancer, Familiar_CVascular,Familiar_Diabetes, Familiar_Enf_Digestivas, Familiar_Enf_Neuromentales
         }= req.body
         //Uso la instancia del modelo PAciente para obtener el metodo y crear el paciente insertandolo a la base de datos
         this.pacienteModel.addNewPacienteModel(tipo,Nombres,Apellidos,Cedula,Edad,Telefono,Ocupacion,Direccion_Completa,Informacion_Adicional,Emergencia,Parentesco,Telefono_Parentesco,Direccion_Parentesco,Pediatrico_Nombres,Pediatrico_Apellidos,Pediatrico_Edad,Pediatrico_Cedula,Pediatrico_Sexo,
            Amigdalitis, Asma, Bronquitis, Cancer, Diabetes, Influenza, Enf_Neuromentales, Cardio_Vasculares, Rubeola, Sarampion, Traumatismos, Neumania, Familiar_Artritis, Familiar_Asma, 
            Familiar_Cancer, Familiar_CVascular,Familiar_Diabetes, Familiar_Enf_Digestivas, Familiar_Enf_Neuromentales
         )
         .then(responsePaciente=>{
             res.status(200).send("fino")//Si se crea eniara un estatus 200 al ejs.
         })
         .catch(err => {
             return res.status(500).send(err);//Si no se crea eniara un estatus 500 al ejs.
         })
    }


    addNewConsulta(req,res){
        
         const{id_historia,fecha, motivo,observacion,diagnostico,tratamiento}= req.body
        
         this.consultasModel.AddNewConsultas(id_historia,fecha, motivo,observacion,diagnostico,tratamiento)
         .then(responseConsulta=>{
             res.status(200).send("fino")
         })
         .catch(err => {
             return res.status(500).send(err);
         })
    }

 
}


export default Api;