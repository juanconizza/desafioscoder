import argsUtil from "../utils/args.js";
import crypto from "crypto";

const persistence = argsUtil.persistence;

class CartsContactDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.buyer_id = data.buyer_id;
    this.seller_id = data.seller_id;
    this.product_id = data.product_id;
    this.quantity = data.quantity || 1;
    this.state = data.state || "pending";
    this.total_purchase = data.total_purchase;

    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default CartsContactDTO;
