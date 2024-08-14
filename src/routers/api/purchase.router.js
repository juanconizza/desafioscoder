import CustomRouter from "../CustomRouter.js";
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
    this.read("/", ["USER"], readPurchases);
    this.read("/paginate", ["USER"], readPaginatedPurchases);
    this.read("/:pid", ["USER"], readPurchaseById);
    this.create("/", ["USER"], createPurchase);
    this.update("/:pid", ["USER"], updatePurchase);
    this.destroy("/:pid", ["USER"], deletePurchase);
    this.destroy("/all", ["USER"], deleteAllPurchases);
  }
}

const purchaseRouter = new PurchaseRouter();

export default purchaseRouter.getRouter();
