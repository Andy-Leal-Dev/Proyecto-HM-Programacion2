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
  