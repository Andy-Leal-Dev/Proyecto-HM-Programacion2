let RepetirWarning = 0;

document.querySelector('.btn-login').addEventListener('click', async () => {
    const User = document.getElementById('username').value; 
    const Password = document.getElementById('password').value; 
    const Warnings = document.getElementById('warning');

    const data ={
        usuario:User,
        password:Password
    }
    console.log(data)
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        

        if (response.ok) { 
        window.location.href = '/Paciente/1'; 
        } else {

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
