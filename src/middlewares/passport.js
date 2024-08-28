import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
//import userManager from "../data/mongo/managers/UsersManager.mongo.js";
import validateUsersProps from "./validateUsersProps.js";
import { createHash, verifyHash } from "../utils/hash.js";
import { createToken } from "../utils/token.js";
import usersRepository from "../repositories/users.rep.js";
import UsersDTO from "../dto/users.dto.js";
import sendEmail from "../utils/emailVerify.js";

passport.use("register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const data = req.body;
        // Acá adaptamos el middleware anterior y lo refactorizamos para las validaciones extra.
        const errors = validateUsersProps(data);

        // Validamos por defecto que role sea 0 (0 = user / 1= admin)
        if (!data.role) {
          req.body.role = 0;
        }

        // Si hay errores, devolver un mensaje de error
        if (Object.keys(errors).length > 0) {
          const error = new Error(
            `Validation error: ${Object.values(errors).join(", ")}`
          );
          error.statusCode = 400;
          error.errors = errors;
          return done(error);
        }

        // Verificamos que el usuario no esté ya registrado.
        let existingUser = await usersRepository.readByEmailRepository(email);
        if (existingUser) {
          const error = new Error("Email already registered! Use another one");
          error.errors = {
            email: "El email ingresado ya fue registrado, utilice otro",
          };
          error.statusCode = 401;
          return done(error);
        }

        // Hasheamos el password
        const hashPassword = createHash(password);
        req.body.password = hashPassword;

        // Creamos el usuario
        const dataDTO = new UsersDTO(req.body)
        const user = await usersRepository.createRepository(dataDTO);        
       
        // Enviamos el email con código verificador
        await sendEmail({
          to: user.email,
          name: user.name,
          code: user.verifyCode,
        });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const one = await usersRepository.readByEmailRepository(email);
        if (!one) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          return done(error);
        }
        
        const verifyPass = verifyHash(password, one.password);
        const verifyAccount = one.verify;

        if (verifyPass && verifyAccount) {
          const user = {
            email,
            online: true,
            role: one.role,
            user_id: one._id,
          };
          const token = createToken(user);          
          user.token = token;          
          return done(null, user);
        } else if (verifyPass && !verifyAccount) {
          // Contraseña válida pero cuenta no verificada
          const error = new Error("Account not verified");
          error.statusCode = 403; // Forbidden status code
          return done(error);
        } else {
          // Contraseña inválida
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          return done(error);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);


//Estrategia vieja de JWT con Passport. La dejo comentada a los fines didacticos. 
// passport.use(
//   "jwt",
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (req) => req?.cookies["token"],
//       ]),
//       secretOrKey: process.env.SECRET_JWT,
//     },
//     (data, done) => {
//       try {
//         if (data) {
//           return done(null, data);
//         } else {
//           const error = new Error("Unauthorized. JWT token not provided or invalid.");
//           error.statusCode = 401;
//           return done(error);
//         }
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );


export default passport;
