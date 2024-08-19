import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "purchases";

const purchaseSchema = new Schema(
  {
    buyer_id: { type: Types.ObjectId, ref: "users", required: true },
    sellers: [  
      {
        seller_id: { type: Types.ObjectId, ref: "users", required: true },
        products: [
          {
            product_id: { type: Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, required: true },
          },
        ],
      },
    ],
    total_purchase: { type: Number, required: true },
    state: {
      type: String,
      enum: ['pending', 'connected', 'success', 'failed'],
      default: "success",
    },
  },
  { timestamps: true }
);

// Middleware para popular los campos antes de realizar una búsqueda o consulta
purchaseSchema.pre("find", function () {
  this.populate("buyer_id", "name phone lastName blockAndLot _id");
  this.populate("sellers.seller_id", "name phone lastName blockAndLot _id");
  this.populate("sellers.products.product_id", "title photo price _id");
});

purchaseSchema.plugin(mongoosePaginate);
const Purchase = model(collection, purchaseSchema);
export default Purchase;
