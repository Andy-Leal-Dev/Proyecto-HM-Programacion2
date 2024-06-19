let RepetirWarning = 0;

document.querySelector('.btn-login').addEventListener('click', async () => {
    const User = document.getElementById('username').value; //obtengo el valor de el nombre del ususario
    const Password = document.getElementById('password').value; //obtengo el valor de la contraseña del usuario
    const Warnings = document.getElementById('warning');

    const data ={
        usuario:User,
        password:Password
    }
    console.log(data)
    try {
        const response = await fetch('/login', { //Usando el fetch hago la peticion a la api para Iniciar sesion
            method: 'POST', //Medoto de envio de datos para obtener una respuesta
            body: JSON.stringify(data), //Aqui transformo el array de datos planos a formato JSOn para que el api me los reconozca
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        

        if (response.ok) { //Si la peticion es exitosa
        window.location.href = '/Paciente/1'; //Me redigira a la pagina principal en este caso paciente
        } else {
        const error = await response.text(); // en caso de error muestra un error. NOTA: eso lo podemos usar para el aviso de contraseña o usuario incorrecto
                  if(RepetirWarning==0){
            Warnings.textContent += "Usuario o Contraseña Incorrecta";
            console.log(Warnings);
            RepetirWarning += 1;
        }
        console.error('Error:', error);

        }
        } catch (error) {
          console.error('Error:', error)

        }
});
