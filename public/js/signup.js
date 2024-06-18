let RepetirAviso = 0;

document.querySelector('.btn-signup').addEventListener('click', async () => {
    //Obtengo todos los valores del formulario por el id de cada uno 
    const Name = document.getElementById('name').value;
    const LastName = document.getElementById('lastName').value;
    const DNI = document.getElementById('DNI').value;
    const Gender = document.getElementById('select-genero').value;
    const User = document.getElementById('username').value;
    const Password = document.getElementById('password').value;
    const PasswordConfir = document.getElementById('passwordConfirm').value;
    const Password_doNoMarth1 = document.querySelector('.Password_NoMatch1');
    const Password_doNoMarth2 = document.querySelector('.Password_NoMatch2');

    //******************************************************** */
    //creo un array con el dato y su valor para su envio
    
    const data ={
            nombre:Name,
            apellido:LastName,
            cedula:DNI,
            genero:Gender,
            usuario:User,
            password:Password,
            cargo:"1"
    }

    if (Password==PasswordConfir) {
        
        
    try {
        const response = await fetch('/signUp', { //Usando el fetch hago la peticion a la api para el Registro
            method: 'POST', //Medoto de envio de datos para obtener una respuesta
            body: JSON.stringify(data), //Aqui transformo el array de datos planos a formato JSOn para que el api me los reconozca
            headers: {'Content-Type': 'application/json'},
            credentials: 'include' 
        });

        if (response.ok) { //Si la peticion es exitosa
        window.location.href = '/Login';  //Mre redigira a la pagina principal en este caso la de Inicio de Sesion
        } else {
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
        Password_doNoMarth1.textContent += "La contraseña no coincide";
        Password_doNoMarth2.textContent += "La contraseña no coincide";
        RepetirAviso+=1;
        }
    }
    
});