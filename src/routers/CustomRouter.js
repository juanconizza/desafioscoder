import { Router } from "express";
import { verifyToken } from "../utils/token.js";
//import userManager from "../data/mongo/managers/UsersManager.mongo.js";
import usersRepository from "../repositories/users.rep.js";

class CustomRouter {
  //para construir y configurar cada instancia del enrutador
  constructor() {
    this.router = Router();
    this.init();
  }
  //para obtener todas las rutas del enrutador definido
  getRouter() {
    return this.router;
  }
  //para inicializar las clases/propiedades heredades (sub-routers)
  init() {}
  //para manejar las callbacks (de middlewares y la final)
  applyCbs(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        return params[2](error);
      }
    });
  }
  //De momento no se están utilizando las respuestas personalizadas pero se deja como posibilidad. 
  response = (req, res, next) => {
    res.message200 = (message) => res.json({ statusCode: 200, message });
    res.response200 = (response) => res.json({ statusCode: 200, response });
    res.paginate = (response, info) =>
      res.json({ statusCode: 200, response, info });
    res.message201 = (message) => res.json({ statusCode: 201, message });
    res.error400 = (message) => res.json({ statusCode: 400, message });
    res.error401 = () =>
      res.json({ statusCode: 401, message: "Bad auth from policies!" });
    res.error403 = () =>
      res.json({ statusCode: 403, message: "Forbidden from policies!" });
    res.error404 = () =>
      res.json({ statusCode: 404, message: "Not found docs" });
    return next();
  };
  policies = (policies) => async (req, res, next) => {
    // Permitir acceso público sin verificación
    if (policies.includes("PUBLIC")) return next();
    // Leer el token de la cookie firmada
    const token = req.signedCookies.token;
    if (!token) {
      return res.error401();
    }

    try {
      // Verificar y decodificar el token
      const decoded = verifyToken(token);

      const { role, email, online } = decoded;
      // Verificar roles permitidos según las políticas
      if (
        (policies.includes("USER") && role === 0) ||
        (policies.includes("ADMIN") && role === 1)
      ) {
        const user = await usersRepository.readByEmailRepository(email);
        if (user) {          
          delete user.password;
          user.online = online;
          user.user_id = user._id
          req.user = user;          
        }        
        return next();
      } else {
        return res
          .status(403)
          .json({statusCode: 403, message: "Forbidden. Insufficient permissions" });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Invalid token. ${error.message}` });
    }
  };
  create(path, arrayOfPolicies, ...callbacks) {
    this.router.post(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  read(path, arrayOfPolicies, ...callbacks) {
    this.router.get(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  update(path, arrayOfPolicies, ...callbacks) {
    this.router.put(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  destroy(path, arrayOfPolicies, ...callbacks) {
    this.router.delete(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  use(path, ...callbacks) {
    this.router.use(path, this.response, this.applyCbs(callbacks));
  }
}

export default CustomRouter;
