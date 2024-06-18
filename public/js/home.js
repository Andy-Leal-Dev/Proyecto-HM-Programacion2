
const CheckAdulto = document.getElementById('CheckAdulto');
const CheckPediatrico = document.getElementById('CheckPediatrico');
let tipo;

CheckAdulto.addEventListener('change', function() {
    if (this.checked) {
        CheckPediatrico.checked = false;
        tipo = 1
      }
  });
  
  CheckPediatrico.addEventListener('change', function() {
    if (this.checked) {
        CheckAdulto.checked = false;
        tipo = 2;
      }
  });



document.querySelector('.btn-search-dni').addEventListener('click', async () => {
  const DNI = document.getElementById('input-dni').value;
  const Warnings = document.getElementById('warning');
     if( DNI == undefined || tipo == undefined){
      Warnings.textContent += "ingrese la cedula y su tipo de paciente";
     } else{
      if(typeof DNI !== 'number'){
        Warnings.textContent += "Solo valores numericos";
        console.log(DNI);
      }else{
        console.log(tipo);
        window.location.href = `/SearchPaciente/${tipo}/${DNI}`
      }
     
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
