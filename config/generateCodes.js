export function generarCodigo() {
    let codigo = "";
    for (let i = 0; i < 6; i++) {
      codigo += Math.floor(Math.random() * 10);
    }
    return codigo;
  }