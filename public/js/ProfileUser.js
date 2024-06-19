  
document.querySelector(".container-setUser").style.display = "none"

document.querySelector(".bth-Close").addEventListener("click", () => {
    document.querySelector(".container-setUser").style.display = "none";
  });

document.querySelector('.btn-UserEdit').addEventListener('click', async () => {
    document.querySelector(".container-setUser").style.display = "flex";
  
  });



