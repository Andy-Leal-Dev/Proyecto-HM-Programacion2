import express from "express"
//Inportacion de los metodos de la clase Index
import IndexController from "../controller/index.controller.js";
const Router = express.Router();
//Instancia de los metodos de la clase Index
const indexController = new IndexController();

Router.get('/' , indexController.viewIndex)


export default Router