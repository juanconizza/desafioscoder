import { genSaltSync, hashSync, compareSync } from "bcrypt";

//Utilidad para crear el hash con bycrypt para usar en el password.

const createHash = (password) => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
};

const verifyHash = (reqBodyPass, mongoPass) => {
  const verify = compareSync(reqBodyPass, mongoPass);
  return verify;
};

export { createHash, verifyHash };