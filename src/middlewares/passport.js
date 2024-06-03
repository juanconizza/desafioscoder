import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import userManager from "../data/mongo/managers/UsersManager.mongo.js";
import validateUsersProps from "./validateUsersProps.js";
import { createHash, verifyHash } from "../services/hash.js";
import { createToken } from "../services/token.js";

passport.use(
  "register",
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
        const existingUser = await userManager.readByEmail(email);
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
        const user = await userManager.create(req.body);
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
        const one = await userManager.readByEmail(email);
        if (!one) {
          const error = new Error("Bad auth from login!");
          error.statusCode = 401;
          return done(error);
        }
        const verify = verifyHash(password, one.password);
        if (verify) {
          const user = {
            email,
            online: true,
            role: one.role,
            user_id: one._id,
          };
          const token = createToken(user);
          user.token = token;
          console.log(user);
          return done (null, user);
        }
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        return done(error);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: process.env.SECRET_JWT,
    },
    (data, done) => {
      try {
        if (data) {
          return done(null, data);
        } else {
          const error = new Error("Forbidden from jwt!");
          error.statusCode = 403;
          return done(error);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
