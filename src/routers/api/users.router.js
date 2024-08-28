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
    this.read("/", ["ADMIN"], readUsers);
    this.read("/:uid", ["USER, ADMIN"], readUserById);
    this.create("/", ["ADMIN"], createUser);
    this.update("/:uid", ["ADMIN"], updateUser);
    this.destroy("/:uid", ["ADMIN"], deleteUser);
  }
}

const userRouter = new UserRouter();

export default userRouter.getRouter();
