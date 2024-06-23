document.querySelector('.btn-search').addEventListener('click',()=>{
    const DNI = document.getElementById('input-dni').value;
    console.log(DNI);

    const Warnings = document.getElementById('warning');
     if( !DNI){
      Warnings.textContent += "ingrese la cedula del usuarioa buscar";
     } else{
        window.location.href = `/Usuario/${DNI}/1`
     }
})