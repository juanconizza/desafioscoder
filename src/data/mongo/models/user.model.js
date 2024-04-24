import { model, Schema } from "mongoose";

const collection = "users";

const schema = new Schema({
  name: { type: String, require: true },
  lastName: { type: String, require: true },
  dni: { type: Number, require: true, unique: true },
  manzanaYLote: { type: String, require: true, unique: true },
  phone: { type: Number, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: Number, default: 0 },
},{ timestamps: true});

const Users = model(collection, schema);
export default Users;
