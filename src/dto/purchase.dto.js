import argsUtil from "../utils/args.js";
import crypto from "crypto";

const persistence = argsUtil.persistence;

class PurchaseDTO {
  constructor(data) {
    if (persistence !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }

    this.buyer_id = data.buyer_id;
    this.sellers = data.sellers || [];  // Asegúrate de que 'sellers' sea un array
    this.total_purchase = data.total_purchase;
    this.state = data.state || "pending";
    
    if (persistence !== "mongo") {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default PurchaseDTO;
