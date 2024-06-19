import CustomRouter from "../CustomRouter.js";
import validateUsersProps from "../../middlewares/validateUsersProps.js";
import {
  readUsers,
  readUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../../controllers/users.controller.js";

class UserRouter extends CustomRouter {
  init() {
    this.read("/", ["USER"], readUsers);
    this.read("/:uid", ["USER"], readUserById);
    this.create("/", ["USER"], validateUsersProps, createUser);
    this.update("/:uid", ["USER"], validateUsersProps, updateUser);
    this.destroy("/:uid", ["USER"], deleteUser);
  }
}

const userRouter = new UserRouter();

export default userRouter.getRouter();
