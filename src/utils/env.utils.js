import { config } from "dotenv";
import argsUtil from "../utils/args.js";

const { env } = argsUtil;

//si env es dev debo usar env.dev
//si env es prod debo usar env.prod
const path = env === "prod" ? "./.env.prod" : "./.env.dev";
config({ path });

const environment = {
  PORT: process.env.PORT,
  LINK_MONGO: process.env.LINK_MONGO,
  SECRET_COOKIE: process.env.SECRET_COOKIE,
  SECRET_SESSION: process.env.SECRET_SESSION,
  SECRET_JWT: process.env.SECRET_JWT,
  SECRET: process.env.SECRET,
  G_MAIL: process.env.G_MAIL,
  G_PASS: process.env.G_PASS, 
};

export default environment;




