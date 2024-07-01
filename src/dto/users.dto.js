import argsUtil from "../utils/args.js";
import crypto from "crypto";

const persistence = argsUtil.persistence;

// Función para generar un número aleatorio de 6 dígitos
const generateRandom6DigitNumber = () => {
  // El rango va desde 100000 hasta 999999 para asegurarnos de que siempre es un número de 6 dígitos
  return crypto.randomInt(100000, 1000000);
};

class UsersDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.name = data.name;
    this.lastName = data.lastName;
    this.dni = data.dni;
    this.blockAndLot = data.blockAndLot;
    this.phone = data.phone;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || 0;
    this.verify = false;    
    this.verifyCode = generateRandom6DigitNumber().toString(); 

    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default UsersDTO;
