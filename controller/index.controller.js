import UserModels from "../Models/user.models.js"
import { generateTokens } from "../config/TokenManger.js";
import {hashPassword,comparePasswords} from "../config/hashPassword.js"

class Index {

    constructor(){
        this.userModel = new UserModels();
        this.signUpUser = this.signUpUser.bind(this);
        this.logInUser = this.logInUser.bind(this);
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

    //Controlador pra inicar sesion
   logInUser(req, res){
    const{usuario,password}= req.body

    this.userModel.getByUserModel(usuario).then(async responseUser=>{

        //Guardo la contraseña obtenida en una variable para mejor manejo
       const passwordHashed = responseUser[0].password
       //comparo las contraseñas con la Funcion ComparePassword
       const MachtPassword = await comparePasswords(password, passwordHashed)
            //Si la contraseña es correcta se va a crear el JWT
            if(MachtPassword){
                const jwt = generateTokens(responseUser[0].id,responseUser[0].cargo)
                res.cookie("jwt",`${jwt}`,{httpOnly: true, secure: true,   sameSite: 'strict' });//se evia al ejs. Nota: esta parte tengo que pasarla como Cookie.
                res.status(200).send('Login successful');
            } else{ //Si la contrseña no es correcta hay que mostrar algo en pantalla
                console.log("no coninciden");
            }
      
        })
        .catch(err => {
        return res.status(500).send(err);
        })
    }

    //Controlador del registro
    async signUpUser(req,res){
        //Pido al ejs los datos para el registro
        const{nombre,apellido,cedula,genero,usuario,password,cargo}= req.body
        //Encripto la contraseña usando la funcion HashPassword
        const passwordHashed = await hashPassword(password);
        //Uso el modelo SignUP Para insertar todo los datos con la constraseña encriptada y creo la cuenta
        this.userModel.signUpUserModel(nombre,apellido,cedula,genero,usuario,passwordHashed,cargo)
        .then(responseUser=>{
            const jwt = generateTokens(responseUser[0].id,responseUser[0].cargo) //Nota: esto lo hacemos para manejar solo la informacion necesaria en los ejs y para validar el acceso de los doctores y secretarias a ciertas rutas
            res.cookie("JWT",jwt,{httpOnly: true, secure: true,   sameSite: 'strict' });
            res.status(200).send('Login successful');
        })
        .catch(err => {
            return res.status(200).send(err);
        })

    }
}

export default Index