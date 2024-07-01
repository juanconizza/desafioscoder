import argsUtil from "../utils/args.js"
import crypto from "crypto";

const persistence = argsUtil.persistence;

class ProductsDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.seller_id = data.seller_id;
    this.title = data.title;
    this.photo = data.photo || "default_picture.png"
    this.category = data.category;
    this.description = data.description || "El usuario no incluyó una descripción";
    this.price = data.price 
    this.stock = data.stock || 1;
    
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default ProductsDTO;