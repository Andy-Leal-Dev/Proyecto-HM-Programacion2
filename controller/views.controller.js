import { VerifyTokenConvertId } from "../config/TokenManger.js"; //Importamos la funcion que nos convierte el JWT al Rol O Id
import PacienteModels from "../Models/pacientes.models.js"; //Importamos El modelo Paciente para Obtener los medodo Para obtener los datos o bascar Datos y Mostrarlos
import UserModels from "../Models/user.models.js";//Importamos El modelo Usuario para Obtener los medodo Para obtener los datos o buscar Datos  y Mostrarlos
import ConsultasModel from "../Models/consultas.models.js";
class Views{
    constructor(){
        this.pacienteModel = new PacienteModels();//Creamos una instancia del Modelo Paciente para Obtener Todos sus metodos
        this.consultaModel = new ConsultasModel();
        this.userModel = new UserModels();//Creamos una instancia del Modelo Usuario para Obtener Todos sus metodos
        this.viewPaciente = this.viewPaciente.bind(this);
        this.viewUsuarios = this.viewUsuarios.bind(this);
        this.searchPaciente = this.searchPaciente.bind(this);
        this.viewProfilePaciente = this.viewProfilePaciente.bind(this);
        this.viewConsulta = this.viewConsulta.bind(this);
        this.viewProfileUsuario = this.viewProfileUsuario.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
        this.searchUsuario = this.searchUsuario.bind(this);
    }


    //Vista de Inicio En este caso el de Pacientes
    viewPaciente(req,res){
        const token = req.cookies.jwt;//Obtengo el JWt de las cookies
        const Convert = VerifyTokenConvertId(token);
        const Rol = Convert.Cargo
        let title = "Pacientes";
        let CurrentPage = parseInt(req.params.page, 10)
            this.pacienteModel.getTotalPacientesModel()
            .then(TotalPage=>{
                this.pacienteModel.getPacientesModel(CurrentPage).then(responsePaciente=>{
                    res.render("Paciente.ejs",{ //Si se obtiene me renderisa(Muestra) la vista de Paciente.ejs
                        Rol,
                        title, //Le paso a la vista el rol para validar lo que puede ver y usar
                        pacientes:responsePaciente, //Le paso a la vista todos los pacientes en la base de datos
                        totalPage:TotalPage,
                        currentPage:CurrentPage
                    });
                }).catch(err => {
                    return res.status(500).send("Error obteniendo los pacientes");//En tal caso dira qu hay un error
                });
            })
            .catch(err => {
                return res.status(500).send("Error obteniendo los pacientes");//En tal caso dira qu hay un error
            });
       
        
    }

    //Vista del registro de pacientes
    viewReg_Paciente(req, res){
        const token = req.cookies.jwt;//Obtengo el JWt de las cookies
        const tipo = req.params.tipo;
        const Convert = VerifyTokenConvertId(token);
        const Rol = Convert.Cargo
        let title = "Registro Pacientes";
        res.render("Paciente-Re.ejs",{Rol, tipo,title});
    }
    //Vista de Paciente Buscado. Esta vista mostrara unicamente el o los paciente que se quiere buscar
    searchPaciente(req,res){
        const token = req.cookies.jwt;
        
        const Convert = VerifyTokenConvertId(token);
        const Rol = Convert.Cargo
        let title = "Pacientes";
       
        let CurrentPage = parseInt(req.params.page, 10)
            this.pacienteModel.getTotalPacientesModel()
            .then(TotalPage=>{
                this.pacienteModel.getByDniModel(req.params.dni,req.params.tipo,CurrentPage) 
                .then(async (responsePaciente) => {
                    res.render("Paciente.ejs", {
                      Rol,
                      pacientes: responsePaciente,
                      title,
                      totalPage:TotalPage,
                      currentPage:CurrentPage
                    });
                  })
                .catch(err => {
                    return res.status(500).send(err);//En tal caso dira qu hay un error
                })
            })
            .catch(err => {
                return res.status(500).send("Error obteniendo los pacientes");//En tal caso dira qu hay un error
            });
    }

  
    viewProfilePaciente(req,res){
        const token = req.cookies.jwt;
        const id = req.params.id;
        let CurrentPage = parseInt(req.params.page, 5)
        const Convert = VerifyTokenConvertId(token);
        const Rol = Convert.Cargo
        let title = "Perfil Pacientes";
        this.consultaModel.getTotalConsultasModel(id)
        .then(responseTotal=>{
            this.consultaModel.getConsultasPaciente(id,CurrentPage).then(responseConsulta=>{
                this.pacienteModel.getPacienteModel(id).then(responsePaciente => {
                    return res.render('Profile_Paciente.ejs',{
                        Rol, 
                        paciente:responsePaciente[0],
                        totalPage:responseTotal,
                        consultas:responseConsulta,
                        currentPage:CurrentPage,
                        title
                    })
                })
                .catch(err => {
                    return res.status(500).send("Error obteniendo productos");
                });
            }).catch(err => {
                return res.status(500).send("Error obteniendo productos");
            });
        })
        .catch(err => {

            return res.status(500).send("Error obteniendo productos");
        });
        
    }
    
  //Vista del registro de consulta
    viewReg_Consulta(req, res){
        const token = req.cookies.jwt;
        const id = req.params.id;
        const tipo = req.params.tipo;
        const Convert = VerifyTokenConvertId(token);
        const Rol = Convert.Cargo
        let title = "Registrar Consultas";
        res.render("Reg_Consulta.ejs",{Rol, id, tipo, title});
    }

    viewConsulta(req,res){
        const token = req.cookies.jwt;
        const id = req.params.id;
        const Convert = VerifyTokenConvertId(token);
        const Rol = Convert.Cargo
        let title = "Consulta";
        this.consultaModel.getConsulta(id).then(responseConsulta=>{
    
            res.render('ShowConsulta.ejs',{
                Rol, 
                consulta:responseConsulta[0],
                title
            })
        }).catch(err => {
            return res.status(500).send("Error obteniendo productos");
        });
    }


 
    //Vista de Usuarios. Esta vista solo tiene acceso los Admins 
    viewUsuarios(req,res){
        const token = req.cookies.jwt;
        const Convert = VerifyTokenConvertId(token);
        const Rol = Convert.Cargo;

        let CurrentPage = parseInt(req.params.page, 10)
        let title = "Usuarios";
        this.userModel.getTotalUsuarioModel().then(resTotal=>{
            this.userModel.getUsersModel(CurrentPage).then(responseUser => {
                res.render("Usuarios.ejs",{ 
                    Rol, 
                    totalPage:resTotal,
                    usuarios:responseUser,
                    currentPage:CurrentPage,
                    title
                });
            })
            .catch(err => {
                return res.status(500).send("Error obteniendo los usuarios");
            });
        }).catch(err => {
            return res.status(500).send("Error obteniendo El total de usuarios");
        });
        
    }

    viewProfileUsuario(req,res){
        const id = req.params.id;
        const token = req.cookies.jwt;
        const Convert = VerifyTokenConvertId(token);
        const Rol = Convert.Cargo
        let title = "Perfil Usuarios";
        this.userModel.getUserModel(id).then(responseUser=>{
            res.render('Profile_Usuario.ejs',{Rol,usuario:responseUser[0], title})
        }).catch(err => {
            return res.status(500).send("Error obteniendo productos");
        });
       
    }

    //Vista de los perfiles. Nota: Haz lo que se te ocurra. cuando se trate pasar la informacion me dices para hacerlo.
    viewProfile(req,res){
        const token = req.cookies.jwt;
        const Convert = VerifyTokenConvertId(token);
        const Rol = Convert.Cargo;
        const id = Convert.Uid;
        let title = "Mi perfil";
        this.userModel.getUserModel(id)
     
        .then(usuarioResponse=>{
            res.render("Profile_Usuario.ejs",{Rol, usuario:usuarioResponse[0],title});
        })
        .catch()
    }

    searchUsuario(req,res){
        const token = req.cookies.jwt;
        const Convert = VerifyTokenConvertId(token);
        const Rol = Convert.Cargo;
        let title = "Mi perfil";
        let CurrentPage = parseInt(req.params.page, 10)

        this.userModel.getTotalUsuarioModel().then(resTotal=>{
            this.userModel.getByDNIModel(req.params.dni, CurrentPage).then(responseUser => {
                res.render("Usuarios.ejs",{ 
                    Rol, 
                    totalPage:resTotal,
                    usuarios:responseUser,
                    currentPage:CurrentPage,
                    title
                });
            })
            .catch(err => {
                return res.status(500).send("Error obteniendo los usuarios");
            });
        }).catch(err => {
            return res.status(500).send("Error obteniendo El total de usuarios");
        });
        
    }


    
}

export default Views