import argsUtil from "../utils/args.js";
import crypto from "crypto";


const persistence = argsUtil.persistence;

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

    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default UsersDTO;
