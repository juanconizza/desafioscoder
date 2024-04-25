import { model, Schema } from "mongoose";

const collection = "products";

const schema = new Schema({
  title: { type: String, required: true },
  photo: { type: String, default: "default_picture.png" },
  category: { type: String, required: true },
  description: {
    type: String,
    default: "El usuario no incluyó una descripcion",
  },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
},{ timestamps: true});

const Product = model(collection, schema);
export default Product;
