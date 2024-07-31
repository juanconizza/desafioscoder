import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const collection = "products";

const schema = new Schema({
  //Relacionamos la colección users para traernos información del usuario que creo el producto.
  seller_id: {type: Types.ObjectId, ref: "users", index: true, required: false},
  title: { type: String, required: true, index: true},
  photo: { type: String, default: "default_picture.png" },
  category: { type: String, required: true, index: true },
  description: {
    type: String,
    default: "El usuario no incluyó una descripcion",
  },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
},{ timestamps: true});

// Con este pre usamos el metodo find para popular user_id con id, nombre, apellido, email y manzanaYLote de quien creo el producto.
schema.pre("find", function () {
  this.populate("seller_id", "name lastName email blockAndLot _id");
});


schema.plugin(mongoosePaginate);
const Product = model(collection, schema);
export default Product;
