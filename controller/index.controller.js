class Index {

    constructor(){

    };
    //Vista Inicio con Iniciar Sesion
    viewIndex(req,res){
        res.render("index.ejs");
    }
    //Vista de Registro
    viewSignUp(req,res){
        res.render("SignUp.ejs");
    }

    viewHome(req,res){
        res.render("home.ejs")
    }
}

export default Index