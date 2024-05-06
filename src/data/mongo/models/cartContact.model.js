import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const collection = "carts_contact";

// Este modelo lo que va a crear es un objeto con la información del usuarios vendedores, el usuario comprador y lo productos que agregó al carrito para luego a partir de esto desplegar la cantidad X de chats para interactuar entre comprador y vendedor/es.

const schema = new Schema(
  {
    buyer_id: { type: Types.ObjectId, ref: "users", required: true },
    seller_id: { type: Types.ObjectId, ref: "users", required: true },
    product_id: { type: Types.ObjectId, ref:"products", required: true, index: true },
    quantity: { type: Number, required: true, default: 1},
    state: {
        type: String,
        enum: ['pending', 'connected', 'success', 'failed'],
        default: 'pending'
      },
    total_purchase: { type: Number },
  },
  { timestamps: true }
);

// Con este pre usamos el metodo findOne para popular el carrito en cuestión con la información necesaria. 
schema.pre("find", function () {
  this.populate("buyer_id", "name lastName blockAndLot _id");
  this.populate("seller_id", "name lastName blockAndLot _id");
  this.populate("product_id", "title photo price stock _id");
});

schema.plugin(mongoosePaginate);
const CartContact = model(collection, schema);
export default CartContact;
