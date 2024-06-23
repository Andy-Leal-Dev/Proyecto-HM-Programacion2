
const CheckAdulto = document.getElementById('CheckAdulto');
const CheckPediatrico = document.getElementById('CheckPediatrico');
let tipo = 0;
let AvisoDuo = false, AvisoDNI =false, AvisoType= false;


CheckAdulto.addEventListener('change', function() {
  if (this.checked) {
    CheckPediatrico.checked = false;
    tipo = 1;
  } else {
    // si el check se quitar la variable tipo vuelve a cero
    if (!CheckPediatrico.checked) {
      tipo = 0;
    }
  }
});

CheckPediatrico.addEventListener('change', function() {
  if (this.checked) {
    CheckAdulto.checked = false;
    tipo = 2;
  } else {
    // si el check se quitar la variable tipo vuelve a cero
    if (!CheckAdulto.checked) {
      tipo = 0;
    }
  }
});



document.querySelector('.btn-search-dni').addEventListener('click', async () => {
  let error =0;
  const DNI = document.getElementById('input-dni').value;
  const Warnings = document.getElementById('warning');
    
  if (DNI=='' && tipo==0) {
    error= 1;
  } else {

    if (tipo==0) {
      error=2;
    } else {
      if (DNI=='') {
        error=3;
      }
    }
  }

    switch (error) {
      case 0:
        window.location.href = `/SearchPaciente/${tipo}/${DNI}/1`
        break;

      case 1:
        if (AvisoDuo==false) {
          Warnings.textContent = "Ingrese la cedula y su tipo de paciente";
          AvisoDuo=true;
          AvisoDNI=false;
          AvisoType=false;
        }  
        break;

      case 2:
        if(AvisoType==false){
          Warnings.textContent = "Ingrese el tipo de paciente";
          AvisoDuo=false;
          AvisoDNI=false;
          AvisoType=true;
        }
        break;

      case 3:
        if (AvisoDNI==false) {
          Warnings.textContent = "Ingrese la cedula";
          AvisoDuo=false;
          AvisoDNI=true;
          AvisoType=false;
        }
        break;
      
      default:
        console.log('Error')
        break;
    }
});


document.querySelector('.btn-Paciente-adulto').addEventListener('click', async () => {
  window.location.href = `/Registro_Paciente/1`

});

document.querySelector('.btn-Paciente-pediatrico').addEventListener('click', async () => {
  window.location.href = `/Registro_Paciente/2`

});
document.querySelector('.btn-add').addEventListener('click', async () => {
  document.querySelector("#PopUp").style.display = "flex";

});


document.querySelector("#btn-exit").addEventListener("click", () => {
  document.querySelector("#PopUp").style.display = "none";
});
