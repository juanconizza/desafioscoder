import multer from "multer";
import path from "path";
import __dirname from "../../utils.js";

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "public/img/products"));
    },
    filename: (req, file, cb) => {
      const filename = req.body.title.replace(/\s/g, "_") + path.extname(file.originalname);
      cb(null, filename);
    }
  });
  

  export const upload = multer({ storage: storage });
