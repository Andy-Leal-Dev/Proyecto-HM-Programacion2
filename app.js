
import express from "express";
import "dotenv/config";
import { join } from "path"; 
import morgan from "morgan";
import IndexRouter from "./routes/index.router.js";
import ViewRouter from "./routes/views.router.js"

const App = express();

App.use(express.static(join('public')));

//EStablece el puerto. SET = establece
App.set('port', process.env.PORT || 2524);
//Utiliza el motor EJS
App.set('view engine', 'ejs');
 //Usa la libreria Morgan para obtener las peticiones que se le hacen al servidor
App.use(morgan('dev'))

//Utiliza las direcciones que se establecen en index.router
App.use('/',IndexRouter);
App.use('/', ViewRouter)

// Escucha el puerto creado. LISTEN = Escucha
App.listen(App.get('port'),()=>{
    console.log('Si sirvo', App.get('port'));
});