
//Inportacion de los metodos de la clase Api
import express from "express"
import ApiController from "../controller/api.controller.js"


//Instancia de los metodos de la clase Api
const Router = express.Router();
const apiController = new ApiController()
//Rutas de usuarios
//

//Rutas de Pacientes
Router.post('/newPaciente',apiController.addNewPaciente)

//

//Rutas Perfil

//
export default Router