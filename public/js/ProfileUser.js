  
document.querySelector(".container-setUser").style.display = "none"

document.querySelector(".bth-Close").addEventListener("click", () => {
    document.querySelector(".container-setUser").style.display = "none";
  });

document.querySelector('.btn-UserEdit').addEventListener('click', async () => {
    document.querySelector(".container-setUser").style.display = "flex";
  
  });

  document.querySelector('.btn-UserDelete').addEventListener('click', async () => {
    document.querySelector("#PopUp").style.display = "flex";
  
  });
  
  
  document.querySelector("#btn-exit").addEventListener("click", () => {
    document.querySelector("#PopUp").style.display = "none";
  });
  document.querySelector(".btn-decline-delete").addEventListener("click", () => {
    document.querySelector("#PopUp").style.display = "none";
  });

  document.querySelector(".btn-acept-Usuario").addEventListener("click", () => {
    const id = document.querySelector('.div-delete-usario').dataset.id;
    console.log(id);
    try {
        const response = fetch(`/api/Usuario/Delete/${id}`, { 
            method: 'DELETE', 
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        
        response.then(resp=>{
            if(resp.ok){
                window.location.href = '/Usuario/1';
            } else{
              console.log(resp);
            }

        })
        
        } catch (error) {


        }
});




