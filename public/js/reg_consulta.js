document.querySelector('.btn-registrar').addEventListener('click', async()=>{

    const fechaConsulta = document.querySelector('#date').value;
    const NombreDoctor = document.querySelector('#doctor').value;
    const MotivoConsulta = document.querySelector('#motivo').value;
    const observacionConsulta = document.querySelector('#observacion').value;
    const diagnosticoConsulta = document.querySelector('#diagnostico').value;
    const tratamientoConsulta = document.querySelector('#tratamiento').value;
    const id = document.querySelector('.form_consulta').dataset.id;



    const data ={
        id_paciente:id,
        fecha:fechaConsulta, 
        doctor:NombreDoctor,
        motivo:MotivoConsulta,
        observacion:observacionConsulta,
        diagnostico:diagnosticoConsulta,
        tratamiento:tratamientoConsulta
        
    }

    console.log(data);

    try {
        const response = await fetch('/api/newConsulta', { //Usando el fetch hago la peticion a la api para Iniciar sesion
            method: 'POST', //Medoto de envio de datos para obtener una respuesta
            body: JSON.stringify(data), //Aqui transformo el array de datos planos a formato JSOn para que el api me los reconozca
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        if (response.ok) { //Si la peticion es exitosa
        window.location.href = '/Paciente'; //Me redigira a la pagina principal en este caso paciente
        } else {
        const error = await response.text(); // en caso de error muestra un error. NOTA: eso lo podemos usar para el aviso de contraseña o usuario incorrecto
        console.error('Error:', error);


        //Aqui pones o le estableces que aparezca y muestre que usuario o contraseña incorrecta

        }
        } catch (error) {
          console.error('Error:', error)
        }
})