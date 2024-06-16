

const radioAntecFamily = document.querySelectorAll('#input-Antec_Per');
const selectedAntcFamily = [];
let AntecFamily = "";
// Add event listeners to radio buttons on page load
radioAntecFamily.forEach(radioButton => {
  radioButton.addEventListener('change', function() {
    if (this.checked) {
      selectedAntcFamily.push(this.value);
    } else {
      // Remove the value from the array if unchecked (optional)
      const index = selectedAntcFamily.indexOf(this.value);
      if (index !== -1) {
        selectedAntcFamily.splice(index, 1);
      }
    }
  });
});

const radioAntecPerso = document.querySelectorAll('#input-antec');
const selectedAntcPerso = [];
let AntecPerso = "";
// Add event listeners to radio buttons on page load
radioAntecPerso.forEach(radioButton => {
  radioButton.addEventListener('change', function() {
    if (this.checked) {
      selectedAntcPerso.push(this.value);
    } else {
      // Remove the value from the array if unchecked (optional)
      const index = selectedAntcPerso.indexOf(this.value);
      if (index !== -1) {
        selectedAntcPerso.splice(index, 1);
      }
    }
  });
});

const radioAntecPedi = document.querySelectorAll('#input-Antec_Neo');
const selectedAntcPedi = [];
let AntecPedi = "";
// Add event listeners to radio buttons on page load
radioAntecPedi.forEach(radioButton => {
  radioButton.addEventListener('change', function() {
    if (this.checked) {
      selectedAntcPedi.push(this.value);
    } else {
      // Remove the value from the array if unchecked (optional)
      const index = selectedAntcPedi.indexOf(this.value);
      if (index !== -1) {
        selectedAntcPedi.splice(index, 1);
      }
    }
  });
});



document.querySelector('.btn-registro').addEventListener('click', async () => {

  for (let i = 0; i < selectedAntcFamily.length; i++) {
    AntecFamily += selectedAntcFamily[i] + ', ';
  }

  for (let i = 0; i < selectedAntcPerso.length; i++) {
    AntecPerso += selectedAntcPerso[i] + ', ';
  }

  for (let i = 0; i < selectedAntcPedi.length; i++) {
    AntecPedi += selectedAntcPedi[i] + ', ';
  }

  const tipoPaciente = document.querySelector('.form-datos').dataset.tipo;


  

  if(tipoPaciente== 1){
  const NombresPaciente = document.querySelector('.name_Ad').value;
  const ApellidosPaciente = document.querySelector('.lastName_Ad').value;
  const CedulaPaciente = document.querySelector('.DNI_Ad').value;
  const EdadPaciente = document.querySelector('.Edad_Ad').value;
  const SexoPaciente = document.querySelector('.select-sexo_Ad').value;
  const TelefonoPaciente = document.querySelector('.tel_Ad').value;
  const OcupacionPaciente = document.querySelector('.ocup_Ad').value;
  const Direccion_CompletaPaciente = document.querySelector('.Direc_Ad').value;
  const Informacion_AdicionalPaciente = document.querySelector('.Info_Ad').value;
  const EmergenciaPaciente = document.querySelector('.emer_Ad').value;
  const ParentescoPaciente = document.querySelector('.Paren_Ad').value;
  const Telefono_ParentescoPaciente = document.querySelector('.tel-Ad').value;
  const Direccion_ParentescoPaciente = document.querySelector('.Dir_Paren_Ad').value;

  const data ={
    tipo:tipoPaciente,
    Nombres:NombresPaciente,
    Apellidos:ApellidosPaciente,
    Cedula:CedulaPaciente,
    Edad:EdadPaciente,
    Sexo:SexoPaciente,
    Telefono:TelefonoPaciente,
    Ocupacion:OcupacionPaciente,
    Direccion_Completa:Direccion_CompletaPaciente,
    Informacion_Adicional:Informacion_AdicionalPaciente,
    Emergencia:EmergenciaPaciente,
    Parentesco:ParentescoPaciente,
    Telefono_Parentesco:Telefono_ParentescoPaciente,
    Direccion_Parentesco:Direccion_ParentescoPaciente,
    Personales:AntecPerso, 
    Familires:AntecFamily, 
    
  }

  console.log(data);

  try {
    const response = await fetch('/api/newPaciente', { //Usando el fetch hago la peticion a la api para Iniciar sesion
        method: 'POST', //Medoto de envio de datos para obtener una respuesta
        body: JSON.stringify(data), //Aqui transformo el array de datos planos a formato JSOn para que el api me los reconozca
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });

    if (response.ok) { //Si la peticion es exitosa
    window.location.href = '/Paciente'; //Me redigira a la pagina principal en este caso paciente
    } else {
    const error = await response.text(); // en caso de error muestra un error. NOTA: eso lo podemos usar para el aviso de contraseña o usuario incorrecto
    Warnings.textContent += "Usuario o Contraseña Incorrecta";
    console.error('Error:', error);

    }
    } catch (error) {
      console.error('Error:', error)
    }

  } else{
  const NombresPaciente = document.querySelector('.name_Ad').value;
  const ApellidosPaciente = document.querySelector('.lastName_Ad').value;
  const CedulaPaciente = document.querySelector('.DNI_Ad').value;
  const EdadPaciente = document.querySelector('.Edad_Ad').value;
  const SexoPaciente = document.querySelector('.select-sexo_Ad').value;
  const TelefonoPaciente = document.querySelector('.tel_Ad').value;
  const OcupacionPaciente = document.querySelector('.ocup_Ad').value;
  const Direccion_CompletaPaciente = document.querySelector('.Direc_Ad').value;
  const Informacion_AdicionalPaciente = document.querySelector('.Info_Ad').value;
  const EmergenciaPaciente = document.querySelector('.emer_Ad').value;
  const ParentescoPaciente = document.querySelector('.Paren_Ad').value;
  const Telefono_ParentescoPaciente = document.querySelector('.tel-Ad').value;
  const Direccion_ParentescoPaciente = document.querySelector('.Dir_Paren_Ad').value;
  const Pediatrico_NombresPaciente = document.querySelector('.name_Ped').value;
  const Pediatrico_ApellidosPaciente = document.querySelector('.last_Ped').value
  const Pediatrico_EdadPaciente = document.querySelector('.Edad_Ped').value;
  const Pediatrico_CedulaPaciente = document.querySelector('.DNI_Ped').value
  const Pediatrico_SexoPaciente = document.querySelector('#select-sexo_Ped').value
  const data ={
    tipo:tipoPaciente,
    Nombres:NombresPaciente,
    Apellidos:ApellidosPaciente,
    Cedula:CedulaPaciente,
    Edad:EdadPaciente,
    Sexo:SexoPaciente,
    Telefono:TelefonoPaciente,
    Ocupacion:OcupacionPaciente,
    Direccion_Completa:Direccion_CompletaPaciente,
    Informacion_Adicional:Informacion_AdicionalPaciente,
    Emergencia:EmergenciaPaciente,
    Parentesco:ParentescoPaciente,
    Telefono_Parentesco:Telefono_ParentescoPaciente,
    Direccion_Parentesco:Direccion_ParentescoPaciente,
    Pediatrico_Nombres:Pediatrico_NombresPaciente,
    Pediatrico_Apellidos:Pediatrico_ApellidosPaciente,
    Pediatrico_Edad:Pediatrico_EdadPaciente,
    Pediatrico_Cedula:Pediatrico_CedulaPaciente,
    Pediatrico_Sexo:Pediatrico_SexoPaciente,
    Personales:AntecPerso, 
    Familires:AntecFamily, 
    Pediatricos:AntecPedi
  }

    console.log(data);


    try {
      const response = await fetch('/api/newPaciente', { //Usando el fetch hago la peticion a la api para Iniciar sesion
          method: 'POST', //Medoto de envio de datos para obtener una respuesta
          body: JSON.stringify(data), //Aqui transformo el array de datos planos a formato JSOn para que el api me los reconozca
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
      });
  
      if (response.ok) { //Si la peticion es exitosa
      window.location.href = '/Paciente'; //Me redigira a la pagina principal en este caso paciente
      } else {
      const error = await response.text(); // en caso de error muestra un error. NOTA: eso lo podemos usar para el aviso de contraseña o usuario incorrecto
      Warnings.textContent += "Usuario o Contraseña Incorrecta";
      console.error('Error:', error);
  
      }
      } catch (error) {
        console.error('Error:', error)
      }
  }
  

 
});