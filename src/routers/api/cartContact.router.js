import CustomRouter from "../CustomRouter.js";
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
    this.read("/", ["USER"], readCartContacts);
    this.read("/paginate", ["USER"], readPaginatedCartContacts);
    this.read("/:cid", ["USER"], readCartContactById);
    this.create("/", ["USER"], createCartContact);
    this.update("/:cid", ["USER"], updateCartContact);
    this.destroy("/:cid", ["USER"], deleteCartContact);
    this.destroy("/all", ["USER"], deleteAllCartContacts);
  }
}

const cartContactRouter = new CartContactRouter();

export default cartContactRouter.getRouter();
