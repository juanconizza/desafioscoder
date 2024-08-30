import CustomRouter from "../CustomRouter.js";
import sameBuyerAndSeller from "../../middlewares/sameBuyerAndSeller.js";
import {
  readCartContacts,
  readPaginatedCartContacts,
  readCartContactById,
  createCartContact,
  updateCartContact,
  deleteCartContact,
  deleteAllCartContacts,
} from "../../controllers/carts.controller.js";

class CartContactRouter extends CustomRouter {
  init() {
    this.read("/", ["ADMIN"], readCartContacts);
    this.read("/paginate", ["ADMIN"], readPaginatedCartContacts);
    this.read("/:cid", ["ADMIN"], readCartContactById);
    this.create("/", ["USER", "ADMIN"], sameBuyerAndSeller, createCartContact);
    this.update("/:cid", ["USER", "ADMIN"], updateCartContact);
    this.destroy("/", ["USER", "ADMIN"], deleteCartContact);
    this.destroy("/all", ["ADMIN"], deleteAllCartContacts);
  }
}

const cartContactRouter = new CartContactRouter();

export default cartContactRouter.getRouter();
