import { model, Schema } from "mongoose";

const collection = "carts_contact";

const schema = new Schema(
  {
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    manzanaYLote: { type: String, required: true },
    product_id: { type: String, required: true },
    photo:{ type: String, default: "/default_picture.png" },
    quantity: { type: Number, required: true },
    state: {
        type: String,
        enum: ['pending', 'connected', 'success', 'failed'],
        default: 'pending'
      },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const CartContact = model(collection, schema);
export default CartContact;
