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
//Cierra sesion y envia a la pagina principal
Router.get('/LogOut' , indexController.logOut)
//Obtiene la visar para registrarse
Router.get('/SignUp' , indexController.viewSignUp)




export default Router