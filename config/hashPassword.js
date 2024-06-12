import bcrypt from "bcryptjs";

//Funcion para hasear(encriptar) la contraseña
export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

//Funcion para Comparar la contraseña ingresada por el usuario y la contraseña encriptada en la base de dats
export async function comparePasswords(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}