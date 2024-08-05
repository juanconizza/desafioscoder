import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";

const schema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    dni: { type: Number, required: true, unique: true },
    blockAndLot: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    verify: { type: Boolean, default: false },
    verifyCode: { type: String, required: true }
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
const Users = model(collection, schema);
export default Users;
