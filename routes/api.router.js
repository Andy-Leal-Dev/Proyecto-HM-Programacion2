
//Inportacion de los metodos de la clase Api
import express from "express"
import ApiController from "../controller/api.controller.js"


//Instancia de los metodos de la clase Api
const Router = express.Router();
const apiController = new ApiController()
//Rutas de usuarios
Router.post('/signUp',apiController.signUpUser)
Router.post('/logIn',apiController.logInUser)
Router.delete('/Usuario/Delete/:id',apiController.deleteUsuario)

//

//Rutas de Pacientes
Router.post('/newPaciente',apiController.addNewPaciente)
Router.put('/updatePaciente',apiController.updatePaciente)
Router.delete('/Paciente/Delete/:id',apiController.deletePaciente)
//
//Rutas de Consulta
Router.post('/newConsulta',apiController.addNewConsulta)

//

export default Router