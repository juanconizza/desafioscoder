import CustomRouter from "../CustomRouter.js";
import sumPurchase from "../../middlewares/sumPurchase.js";
import createStripeSession from "../../middlewares/createStripeSession.js";
import verifyStripePayment from "../../middlewares/verifyStripePayment.js";

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
    this.read("/", ["ADMIN"], readPurchases);
    this.read("/paginate", ["ADMIN"], readPaginatedPurchases);
    this.read("/:pid", ["ADMIN"], readPurchaseById);
    this.create("/", ["USER", "ADMIN"], sumPurchase, createStripeSession);
    this.create("/verify-payment", ["USER", "ADMIN"], sumPurchase, verifyStripePayment, createPurchase);
    this.update("/:pid", ["ADMIN"], updatePurchase);
    this.destroy("/:pid", ["ADMIN"], deletePurchase);
    this.destroy("/all", ["ADMIN"], deleteAllPurchases);
  }
}

const purchaseRouter = new PurchaseRouter();

export default purchaseRouter.getRouter();
