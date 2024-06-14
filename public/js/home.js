
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
     if( isNaN(DNI)){
      console.log("ingrasa los datos bien");
     } else{
      console.log(tipo);
        window.location.href = `/SearchPaciente/${tipo}/${DNI}`
     }

});

