import express from "express"
const Router = express.Router();
//Inportacion de los metodos de la clase Index
import IndexController from "../controller/index.controller.js";
//Instancia de los metodos de la clase Index
const indexController = new IndexController();


Router.get('/Login' , indexController.viewIndex)
Router.get('/SignUp' , indexController.viewSignUp)
Router.get('/',indexController.viewHome)

export default Router