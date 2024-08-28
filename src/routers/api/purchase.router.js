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
    this.read("/", ["USER", "ADMIN"], readPurchases);
    this.read("/paginate", ["USER", "ADMIN"], readPaginatedPurchases);
    this.read("/:pid", ["USER", "ADMIN"], readPurchaseById);
    this.create("/", ["USER", "ADMIN"], sumPurchase, createStripeSession);
    this.create("/verify-payment", ["USER", "ADMIN"], sumPurchase, verifyStripePayment, createPurchase);
    this.update("/:pid", ["USER", "ADMIN"], updatePurchase);
    this.destroy("/:pid", ["USER", "ADMIN"], deletePurchase);
    this.destroy("/all", ["USER", "ADMIN"], deleteAllPurchases);
  }
}

const purchaseRouter = new PurchaseRouter();

export default purchaseRouter.getRouter();
