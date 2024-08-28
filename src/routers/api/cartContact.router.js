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
    this.read("/", ["USER", "ADMIN"], readCartContacts);
    this.read("/paginate", ["USER", "ADMIN"], readPaginatedCartContacts);
    this.read("/:cid", ["USER", "ADMIN"], readCartContactById);
    this.create("/", ["USER", "ADMIN"], sameBuyerAndSeller, createCartContact);
    this.update("/:cid", ["USER", "ADMIN"], updateCartContact);
    this.destroy("/:cid", ["USER", "ADMIN"], deleteCartContact);
    this.destroy("/all", ["USER", "ADMIN"], deleteAllCartContacts);
  }
}

const cartContactRouter = new CartContactRouter();

export default cartContactRouter.getRouter();
