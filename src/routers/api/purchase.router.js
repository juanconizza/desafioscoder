import CustomRouter from "../CustomRouter.js";
import sumPurchase from "../../middlewares/sumPurchase.js";
import {
    readPurchases,
    readPaginatedPurchases,
    readPurchaseById,
    createPurchase,
    updatePurchase,
    deletePurchase,
    deleteAllPurchases,
} from "../../controllers/purchases.controller.js";


class PurchaseRouter extends CustomRouter {
  init() {
    this.read("/", ["USER", "ADMIN"], readPurchases);
    this.read("/paginate", ["USER", "ADMIN"], readPaginatedPurchases);
    this.read("/:pid", ["USER", "ADMIN"], readPurchaseById);
    this.create("/", ["USER", "ADMIN"], sumPurchase, createPurchase); 
    this.update("/:pid", ["USER", "ADMIN"], updatePurchase);
    this.destroy("/:pid", ["USER", "ADMIN"], deletePurchase);
    this.destroy("/all", ["USER", "ADMIN"], deleteAllPurchases);
  }
}

const purchaseRouter = new PurchaseRouter();

export default purchaseRouter.getRouter();
