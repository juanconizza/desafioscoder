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

class ProductRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], readProducts);
    this.read("/paginate", ["PUBLIC"], readPaginatedProducts);
    this.read("/:pid", ["PUBLIC"], readProductById);
    this.create("/", ["USER"], validateProductsProps, createProduct);
    this.update("/:pid", ["USER"], validateProductsProps, updateProduct);
    this.destroy("/:pid", ["USER"], deleteProduct);
  }
}

const productRouter = new ProductRouter();

export default productRouter.getRouter();
