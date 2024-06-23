import UserModels from "../Models/user.models.js"


class Index {

    constructor(){
     
    };
    
    //Vista Inicio con Iniciar Sesion
    viewLogin(req,res){
        res.render("LogIn.ejs");
    }

    //Vista de Registro
    viewSignUp(req,res){
        res.render("SignUp.ejs");
    }

    //Vista Principal
    viewIndex(req,res){
        res.render("Index.ejs");
    }
    //Este metodo no es una vista, este metodo es para Cerrar sesion y borrar el JWT de las Cookies
    logOut(req,res){
        res.clearCookie('jwt'); // Elimina la cookie 'jwt'
        res.redirect('/')// Te redirige a la pagina principal
    }


}

export default Index