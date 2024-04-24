import User from "./models/cartContact.model.js"
import Manager from "./Manager.mongo.js";

const cartContactManager = new Manager(User);
export default cartContactManager;