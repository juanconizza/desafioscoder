import { model, Schema } from "mongoose";

const collection = "carts_contact";

const schema = new Schema(
  {
    user_id: { type: String, require: true },
    name: { type: String, require: true },
    lastName: { type: String, require: true },
    manzanaYLote: { type: String, require: true },
    product_id: { type: String, require: true },
    photo:{ type: String, default: "/default_picture.png" },
    quantity: { type: Number, require: true },
    state: {
        type: String,
        enum: ['pending', 'connected', 'success', 'failed'],
        default: 'pending'
      },
    total: { type: Number, require: true },
  },
  { timestamps: true }
);

const CartContact = model(collection, schema);
export default CartContact;
