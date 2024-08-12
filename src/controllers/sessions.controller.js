import {
  readOneEmailService,
  updateService,
} from "../services/users.service.js";
import sendEmail from "../utils/emailVerify.js";
import { createHash } from "../utils/hash.js";

class SessionsController {
  register = async (req, res, next) => {
    try {
      res.status(201).json({
        statusCode: 201,
        message: "User created successfully!",
      });
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      if (!req.user || !req.user.token) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      // Opciones para la cookie
      const cookieOptions = {
        httpOnly: true,
        signed: true,
      };
      return res
        .cookie("token", req.user.token, cookieOptions)    
        .json({ statusCode: 200, message: "Logged in!" });
    } catch (error) {
      return next(error);
    }
  };

  auth = async (req, res, next) => {
    try {
      // Verificar si el usuario está en línea
      if (req.user.online) {
        return res.json({
          statusCode: 200,
          message: "Is Online!",
          user_id: req.user._id,
        });
      } else {
        return res.json({
          statusCode: 401,
          message: "Not Online!",
        });
      }
    } catch (error) {
      return next(error);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const { email } = req.body;

      // Verificar si el usuario existe
      const user = await readOneEmailService(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generar un nuevo código de verificación
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Actualizar el usuario con el nuevo código de verificación
      const updatedUser = await updateService(user._id, {
        verifyCode: resetCode,
      });

      // Preparar los datos del correo electrónico
      const emailData = {
        to: email,
        name: user.name || "User",
        code: resetCode,
      };

      // Enviar el correo electrónico
      await sendEmail(emailData);

      return res.status(200).json({ message: "Reset password email sent" });
    } catch (error) {
      return next(error);
    }
  };

  changePassword = async (req, res, next) => {
    try {
      const { email, verifyCode, newPassword, confirmPassword } = req.body;

      // Verificar si las contraseñas coinciden
      if (newPassword !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "Las contraseñas no coinciden" });
      }

      // Validar la contraseña con la expresión regular
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          message: `"Contraseña" debe tener al menos 8 caracteres y 1 letra mayúscula y al menos 1 número.`,
        });
      }

      // Verificar si el usuario existe
      const user = await readOneEmailService(email);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Verificar el código de seguridad
      if (user.verifyCode !== verifyCode) {
        return res
          .status(400)
          .json({ message: "El código de verificación es inválido" });
      }
      // Hasheamos la contraseña
      const hashPassword = createHash(newPassword);

      // Actualizar la contraseña del usuario
      await updateService(user._id, {
        password: hashPassword,
        verifyCode: null, // Limpiar el código de verificación después de usarlo
      });

      return res.status(200).json({ message: "Contraseña Cambiada con Éxito" });
    } catch (error) {
      return next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      req.user.online = false;
      res.clearCookie("token", { signed: true });
      return res.json({ statusCode: 200, message: "Signed out!" });
    } catch (error) {
      return next(error);
    }
  };
}

const sessionsController = new SessionsController();
const { register, login, auth, resetPassword, changePassword, logout } =
  sessionsController;
export { register, login, auth, resetPassword, changePassword, logout };
