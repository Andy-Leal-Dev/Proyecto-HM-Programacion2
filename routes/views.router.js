import express from "express"
//Inportacion de los metodos de la clase Index
import ViewController from '../controller/views.controller.js';
//Importo el middleware de validacion para que no puedan accerder sin JWT
import { authMiddleware } from "../config/TokenManger.js"; 
//Instancia de la ruta de Express
const Router = express.Router();
//Instancia de los metodos de la clase Index
const viewController = new ViewController();
Router.get('/Paciente/:page', authMiddleware, viewController.viewPaciente)//Vista principal. En este caso el listado de los pacientes
Router.get('/SearchPaciente/:tipo/:dni', authMiddleware, viewController.searchPaciente) //Vista de Paciente buscado. este pide un DNi(Cedula) por parametro para su busqueda
Router.get('/Usuario', authMiddleware, viewController.viewUsuarios) //Vista del listado de los usuarios. Solo puede acceder el Admin
Router.get('/Perfil', authMiddleware, viewController.viewProfile) //Vista del perfil de los Usuarios Doctores y secretarios
Router.get('/Registro_Paciente/:tipo',authMiddleware, viewController.viewReg_Paciente )//Vista registro de paciente
Router.get('/Registro_Consulta/:tipo/:id',authMiddleware, viewController.viewReg_Consulta)//Vista de registro de consulta
Router.get('/HC/:tipo/:id', viewController.viewProfilePaciente);
Router.get('/Consulta/:id', viewController.viewConsulta);
Router.get('/PerfilUsuario', viewController.viewProfileUsuario)
export default  Router;