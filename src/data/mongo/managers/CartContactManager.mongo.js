import CartContact from "../models/cartContact.model.js"
import Manager from "../Manager.mongo.js";

const cartContactManager = new Manager(CartContact);
export default cartContactManager;