import express from "express"
const Router = express.Router();
//Inportacion de los metodos de la clase Index
import IndexController from "../controller/index.controller.js";
//Instancia de los metodos de la clase Index
const indexController = new IndexController();

//Obtiene la vista de inicio
Router.get('/', indexController.viewIndex)
//Obtiene la vista para iniciar Secion
Router.get('/Login' , indexController.viewLogin)
//Obtiene la visar para registrarse
Router.get('/SignUp' , indexController.viewSignUp)
//Api. Envia los datos para regitrarse
Router.post('/signUp',indexController.signUpUser)
//Api. Envia los datos para iniciar sesion
Router.post('/logIn',indexController.logInUser)



export default Router