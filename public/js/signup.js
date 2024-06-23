
let RepetirAviso = 0;
let i=0, j=0,r=0, k=0,l=0, m=0, s=0;
const Form = document.querySelector('.form-SignUp')
const inputs = document.querySelectorAll('.form-SignUp input')
const WarName = document.querySelector('.War-name');
const Warlastname = document.querySelector('.War-lastname');
const WarDNI = document.querySelector('.War-DNI')
const WarUser = document.querySelector('.War-User')
const Password_doNoMarth1 = document.querySelector('.Password_NoMatch1');
const Password_doNoMarth2 = document.querySelector('.Password_NoMatch2');


const expresiones ={
    nombre: /^[a-zA-ZÄ-ÿ\s]{2,40}$/,
    usuario:/^[a-zA-Z0-9]{4,16}$/,
    contras:/^[a-zA-Z0-9\_\-]{4,12}$/,
    DNI:/^[0-9]{1,30}/
}

const Campos = {
    nombreUser: false,
    lastnameUser: false,
    DNI: false,
    User: false,
    password1: false,
    password2:false
}
    
    const validarForm = (e)=>{
        switch(e.target.name){
            
            //Validadcion Nombre
            case "nameUser":
                console.log(expresiones.nombre.test(e.target.value));
                if (expresiones.nombre.test(e.target.value)==false) {
                    document.querySelector("#name").style.border = "1px solid red";
                    if(i==0){
                        WarName.textContent = "El campo no puede contener numeros o caracteres especiales";
                        i+=1;
                    }
                    Campos.nombreUser=false;
                }else{
                    document.querySelector("#name").style.border = "1px solid rgb(47, 105, 153)";
                    WarName.textContent="";
                    i=0;
                    Campos.nombreUser=true;
                }
            break;
            //Validacion Apellido
            case "lastNameUser":
                console.log(expresiones.nombre.test(e.target.value));

                if (expresiones.nombre.test(e.target.value)==false) {
                    document.querySelector("#lastName").style.border = "1px solid red";
                    if(j==0){
                        Warlastname.textContent = "El campo no puede contener numeros o caracteres especiales";
                        j+=1;
                    }
                    Campos.lastnameUser=false;
                }else{
                    document.querySelector("#lastName").style.border = "1px solid rgb(47, 105, 153)";
                    Warlastname.textContent="";
                    j=0;
                    Campos.lastnameUser=true;
                }
            break;
            
                        //Validacion DNI
            case "DNIUser":
                if (expresiones.DNI.test(e.target.value)==false) {
                    document.querySelector("#DNI").style.border = "1px solid red";
                    if(r==0){
                        WarDNI.textContent = "El campo solo puede contener numeros";
                        r+=1;
                    }
                    Campos.DNI=false;
            }else{
                document.querySelector("#DNI").style.border = "1px solid rgb(47, 105, 153)";
                WarDNI.textContent="";
                r=0;
                Campos.DNI=true;
            }
            
            break;
            //Validacion Usuario
            case "User":
                if (expresiones.usuario.test(e.target.value)==false) {
                    document.querySelector("#username").style.border = "1px solid red";
                    if(k==0){
                        WarUser.textContent = "El campo solo puede contener letras y numeros";
                        k+=1;
                    }
                    Campos.User=false;
                }else{
                    document.querySelector("#username").style.border = "1px solid rgb(47, 105, 153)";
                    WarUser.textContent="";
                    k=0;
                    Campos.User=true;
                }

            break;

            //Validadcion Contrase;a
            case "PasswordUser":
                if (expresiones.contras.test(e.target.value)==false) {
                    document.querySelector("#password").style.border = "1px solid red";
                    if(l==0){
                        Password_doNoMarth1.textContent = "El campo debe contener de 4 a 12 digitos";
                        l+=1;
                    }
                    Campos.password1=false;
                }else{
                    document.querySelector("#password").style.border = "1px solid rgb(47, 105, 153)";
                    Password_doNoMarth1.textContent="";
                    l=0;
                    Campos.password1=true;
                }
            break;

            //Validacion Confirmar Contrase;a 
            case "PasswordConfirmUser":
                if (expresiones.contras.test(e.target.value)==false) {
                    document.querySelector("#passwordConfirm").style.border = "1px solid red";
                    if(m==0){
                        Password_doNoMarth2.textContent = "El campo debe contener de 4 a 12 digitos";
                        m+=1;
                    }
                    Campos.password2=false;
                }else{
                    document.querySelector("#passwordConfirm").style.border = "1px solid rgb(47, 105, 153)";
                    Password_doNoMarth2.textContent="";
                    m=0;
                    Campos.password2=true;
                }
            break;

        }


    }


    inputs.forEach((input)=>{
        input.addEventListener('keyup',validarForm);
        input.addEventListener('blur',validarForm);
    })



document.querySelector('.btn-signup').addEventListener('click', async () => {

    const WarBtnSignUP = document.querySelector('.War-btnSignUp');

    if (Campos.nombreUser==true && Campos.lastnameUser==true && Campos.DNI==true && Campos.User==true && Campos.password1==true && Campos.password2==true) {
        
 
        //Obtengo todos los valores del formulario por el id de cada uno 
        const Name = document.getElementById('name').value;
        const LastName = document.getElementById('lastName').value;
        const DNI = document.getElementById('DNI').value;
        const Telefono = document.getElementById('tel').value;
        const Gender = document.getElementById('select-sexo').value;
        const Rol = document.getElementById('select-rol').value;
        const User = document.getElementById('username').value;
        const Password = document.getElementById('password').value;
        const PasswordConfir = document.getElementById('passwordConfirm').value;

        //******************************************************** */
        //crea un array con el dato y su valor para su envio

    
        const data ={
            nombre:Name,
            apellido:LastName,
            cedula:DNI,
            Telefono:Telefono,
            genero:Gender,
            usuario:User,
            password:Password,
            cargo:Rol
        }

        if (Password==PasswordConfir) {
        
        
        try {
            const response = await fetch('/api/signUp', { //Usando el fetch hago la peticion a la api para el Registro
                method: 'POST', //Medoto de envio de datos para obtener una respuesta
                body: JSON.stringify(data), //Aqui transformo el array de datos planos a formato JSOn para que el api me los reconozca
                headers: {'Content-Type': 'application/json'},
                credentials: 'include' 
            });

            if (response.status == 302) {
                WarBtnSignUP.textContent ="Ese Usuario ya exite";
            } else if(response.ok) {
                window.location.href = '/Login'; 
            } else{
                const error = await response.text(); // en caso de error muestra un error. NOTA: eso lo podemos usar para el aviso.
                console.error('Error:', error);

            }
            
        } catch (error) {
            console.error('Error:', error);
            // Handle fetch errors (e.g., network issues)
        }
        console.log(data);

        }else{
            if(RepetirAviso==0){
                Password_doNoMarth1.textContent = "La contraseña no coincide";
                Password_doNoMarth2.textContent = "La contraseña no coincide";
                RepetirAviso+=1;
            }
        }

    }else{
        Form.addEventListener('click',(e)=>{

            e.preventDefault();
            if(s==0){
                WarBtnSignUP.textContent ="Rellene el formulario de forma adecuada";
                s+=1;
            }
            

        })
    }

});
