document.querySelector('.btn-search-dni').addEventListener('click', async () => {
    const DNI = document.getElementById('input-dni').value; //Obtengo el valir de la cedula para la busqueda
    window.location.href = `/SearchPaciente/${DNI}`//Ejecuto la url de busqueda de paciente por su Cedula
});