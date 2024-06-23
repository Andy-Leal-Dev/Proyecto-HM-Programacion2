document.querySelector(".container-setPacientes").style.display = "none"


document.querySelector('.btn-Delete').addEventListener('click', async () => {
    document.querySelector("#PopUp").style.display = "flex";
  
  });
  
  
  document.querySelector("#btn-exit").addEventListener("click", () => {
    document.querySelector("#PopUp").style.display = "none";
  });
  document.querySelector(".btn-decline").addEventListener("click", () => {
    document.querySelector("#PopUp").style.display = "none";
  });

  document.querySelector(".btn-acept").addEventListener("click", () => {
        const id = document.querySelector('.Container-Pefil-paciente').dataset.id;
        try {
            const response = fetch(`/api/Paciente/Delete/${id}`, { 
                method: 'DELETE', 
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
            
            response.then(resp=>{
                if(resp.ok){
                    window.location.href = '/Paciente/1';
                }

            })
            
            } catch (error) {
              console.error('Error:', error)
    
            }
  });
  

    
document.querySelector(".container-setPacientes").style.display = "none"

document.querySelector(".bth-Close").addEventListener("click", () => {
    document.querySelector(".container-setPacientes").style.display = "none";
  });

document.querySelector('.btn-Edit').addEventListener('click', async () => {
    document.querySelector(".container-setPacientes").style.display = "flex";
  
  });




document.querySelector('.bth-UptData').addEventListener('click', async () => {
  const tipoPaciente = document.querySelector('.container-setUser').dataset.tipo;
  const id = document.querySelector('.container-setUser').dataset.id;

  const data ={}

  if(tipoPaciente== 1){
  const NombresPaciente = document.querySelector('.name_Ad').value;
  const ApellidosPaciente = document.querySelector('.lastName_Ad').value;
  const CedulaPaciente = document.querySelector('.DNI_Ad').value;
  const EdadPaciente = document.querySelector('.Edad_Ad').value;
  const TelefonoPaciente = document.querySelector('.tel_Ad').value;
  const OcupacionPaciente = document.querySelector('.ocup_Ad').value;
  const Direccion_CompletaPaciente = document.querySelector('.Direc_Ad').value;
  const Informacion_AdicionalPaciente = document.querySelector('.Info_Ad').value;
  const EmergenciaPaciente = document.querySelector('.emer_Ad').value;
  const ParentescoPaciente = document.querySelector('.Paren_Ad').value;
  const Telefono_ParentescoPaciente = document.querySelector('.tel-Ad-paren').value;
  const Direccion_ParentescoPaciente = document.querySelector('.Dir_Paren_Ad').value;
 
  if(id){ data.id = id}

  if(tipoPaciente){ data.tipo = tipoPaciente}

  if(NombresPaciente){ data.Nombres = NombresPaciente}

  if(ApellidosPaciente){  data.Apellidos = ApellidosPaciente}

  if(CedulaPaciente){ data.Cedula = CedulaPaciente}

  if(EdadPaciente){ data.Edad = EdadPaciente}

  if(TelefonoPaciente){data.Telefono=TelefonoPaciente}

  if(Direccion_CompletaPaciente){data.Direccion_Completa = Direccion_CompletaPaciente}

  if(Informacion_AdicionalPaciente){data.Informacion_Adicional=Informacion_AdicionalPaciente}

  if(EmergenciaPaciente){data.Emergencia = EmergenciaPaciente}

  if(ParentescoPaciente){data.Parentesco = ParentescoPaciente}

  if(Telefono_ParentescoPaciente){data.Telefono_Parentesco = Telefono_ParentescoPaciente}

  if(Direccion_ParentescoPaciente){data.Direccion_Parentesco= Direccion_ParentescoPaciente}



  console.log(data);
  if (Object.keys(data).length > 0) {
    try {
      const response = await fetch('/api/updatePaciente', { //Usando el fetch hago la peticion a la api para Iniciar sesion
          method: 'PUT', //Medoto de envio de datos para obtener una respuesta
          body: JSON.stringify(data), //Aqui transformo el array de datos planos a formato JSOn para que el api me los reconozca
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
      });
  
      if (response.ok) { //Si la peticion es exitosa
      window.location.href = `/HC/${tipoPaciente}/${id}/1`; //Me redigira a la pagina principal en este caso paciente
      } else {
      const error = await response.text(); // en caso de error muestra un error. NOTA: eso lo podemos usar para el aviso de contraseña o usuario incorrecto
      Warnings.textContent += "Usuario o Contraseña Incorrecta";
      console.error('Error:', error);
  
      }
      } catch (error) {
        console.error('Error:', error)
      }
  } else {
    
  console.log(data);
  }
 

  } else{
  const NombresPaciente = document.querySelector('.name_Ad').value;
  const ApellidosPaciente = document.querySelector('.lastName_Ad').value;
  const CedulaPaciente = document.querySelector('.DNI_Ad').value;
  const EdadPaciente = document.querySelector('.Edad_Ad').value;
  const OcupacionPaciente = document.querySelector('.ocup_Ad').value;
  const ParentescoPaciente = document.querySelector('.Paren_Ad').value;
  const Telefono_ParentescoPaciente = document.querySelector('.tel-Ad-paren').value;
  const Direccion_ParentescoPaciente = document.querySelector('.Dir_Paren_Ad').value;
  const Pediatrico_NombresPaciente = document.querySelector('.name_Ped').value;
  const Pediatrico_ApellidosPaciente = document.querySelector('.last_Ped').value
  const Pediatrico_EdadPaciente = document.querySelector('.Edad_Ped').value;
  const Pediatrico_CedulaPaciente = document.querySelector('.DNI_Ped').value

  const data ={}

  if(id){data.id=id}
  if(tipoPaciente){ data.tipo=tipoPaciente}
  if(NombresPaciente){ data.Nombres=NombresPaciente}
  if(ApellidosPaciente){ data.Apellidos=ApellidosPaciente}
  if(CedulaPaciente){data.Cedula=CedulaPaciente}
  if(EdadPaciente){ data.Edad=EdadPaciente}
  if(OcupacionPaciente){data.Ocupacion=OcupacionPaciente}
  if(ParentescoPaciente){data.Parentesco=ParentescoPaciente}
  if(Telefono_ParentescoPaciente){data.Telefono_Parentesco=Telefono_ParentescoPaciente}
  if(Direccion_ParentescoPaciente){data.Direccion_Parentesco=Direccion_ParentescoPaciente}
  if(Pediatrico_NombresPaciente){data.Pediatrico_Nombres=Pediatrico_NombresPaciente}
  if(Pediatrico_ApellidosPaciente){data.Pediatrico_Apellidos=Pediatrico_ApellidosPaciente}
  if(Pediatrico_CedulaPaciente){data.Pediatrico_Edad=Pediatrico_EdadPaciente}
  if(Pediatrico_EdadPaciente){data.Pediatrico_Cedula=Pediatrico_CedulaPaciente}

    console.log(data);

    if (Object.keys(data).length > 0) {
      try {
        const response = await fetch('/api/updatePaciente', { //Usando el fetch hago la peticion a la api para Iniciar sesion
            method: 'PUT', //Medoto de envio de datos para obtener una respuesta
            body: JSON.stringify(data), //Aqui transformo el array de datos planos a formato JSOn para que el api me los reconozca
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
    
        if (response.ok) { //Si la peticion es exitosa
        window.location.href = `/HC/${tipoPaciente}/${id}/1`; //Me redigira a la pagina principal en este caso paciente
        } else {
        const error = await response.text(); // en caso de error muestra un error. NOTA: eso lo podemos usar para el aviso de contraseña o usuario incorrecto
        Warnings.textContent += "Usuario o Contraseña Incorrecta";
        console.error('Error:', error);
    
        }
        } catch (error) {
          console.error('Error:', error)
        }
    } else {
      
    console.log(data);
    }
  
  }
  
  });

