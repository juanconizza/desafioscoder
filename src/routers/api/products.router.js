import CustomRouter from "../CustomRouter.js";
import validateProductsProps from "../../middlewares/validateProductsProps.js";
import {
  readProducts,
  readPaginatedProducts,
  readProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/products.controller.js";
import isProductOwner from "../../middlewares/isProductOwner.js";
import validateOwner from "../../middlewares/validateOwner.js";

class ProductRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], readProducts);
    this.read("/paginate", ["PUBLIC"], readPaginatedProducts);
    this.read("/:pid", ["PUBLIC"], readProductById);
    this.create("/", ["USER"], validateProductsProps, isProductOwner, createProduct);
    this.update("/:pid", ["USER"], validateOwner, isProductOwner, updateProduct);
    this.destroy("/:pid", ["USER"], validateOwner, isProductOwner, deleteProduct);
  }
}

const productRouter = new ProductRouter();

export default productRouter.getRouter();
