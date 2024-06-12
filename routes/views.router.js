import express from "express"
//Inportacion de los metodos de la clase Index
import ViewController from '../controller/views.controller.js';
const Router = express.Router();
//Instancia de los metodos de la clase Index
const viewController = new ViewController();

Router.get('/Home')

export default  Router;