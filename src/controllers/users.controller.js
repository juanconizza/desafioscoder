import {
  createService,
  readService,
  paginateService,
  readOneService,
  readOneEmailService,
  updateService,
  destroyService,
} from "../services/users.service.js";

class UsersController {
  readUsers = async (req, res, next) => {
    try {
      let users = await readService();
      let filteredUsers = users;

      if (req.query.role !== undefined) {
        const role = parseInt(req.query.role);
        filteredUsers = users.filter((user) => user.role === role);
      }

      if (filteredUsers.length > 0) {
        res.status(200).json({
          statusCode: 200,
          response: filteredUsers,
        });
      } else {
        res.status(404).json({
          statusCode: 404,
          response: null,
          message: "No users to display",
        });
      }
    } catch (error) {
      return next(error);
    }
  };

  readUserById = async (req, res, next) => {
    try {
      const user = await readOneService(req.params.uid);
      if (!user) {
        res.status(404).json({
          statusCode: 404,
          response: null,
          message: "User not found",
        });
      } else {
        res.status(200).json({ statusCode: 200, response: user });
      }
    } catch (error) {
      return next(error);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await createService(data);
      res.status(201).json({
        statusCode: 201,
        response: newUser.id,
        message: "User created successfully!",
      });
    } catch (error) {
      return next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const updatedUser = await updateService(uid, data);
      if (!updatedUser) {
        return res.status(404).json({
          statusCode: 404,
          error: `User with ID ${uid} not found.`,
        });
      }
      res.status(200).json({
        statusCode: 200,
        response: updatedUser,
      });
    } catch (error) {
      return next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const deletedUser = await destroyService(uid);
      if (deletedUser) {
        res.status(200).json({
          statusCode: 200,
          response: deletedUser,
        });
      } else {
        throw new Error(`Failed to delete user with ID ${uid}.`);
      }
    } catch (error) {
      return next(error);
    }
  };
}

const usersController = new UsersController();
const { readUsers, readUserById, createUser, updateUser, deleteUser } =
  usersController;
export { readUsers, readUserById, createUser, updateUser, deleteUser };
