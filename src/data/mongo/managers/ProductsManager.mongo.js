import Product from "../models/product.model.js"
import Manager from "../Manager.mongo.js";

const productManager = new Manager(Product);
export default productManager;