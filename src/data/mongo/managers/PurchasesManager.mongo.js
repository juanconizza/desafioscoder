import Purchase from "../models/purchase.model.js"
import Manager from "../Manager.mongo.js";

const purchaseManager = new Manager(Purchase);
export default purchaseManager;