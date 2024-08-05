import multer from "multer";
import path from "path";
import __dirname from "../../pathhandler.js";

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/img/products"));
  },
  filename: (req, file, cb) => {
    // Obtener la extensión del archivo
    const extname = path.extname(file.originalname);
    // Generar un nombre único usando la fecha actual y la extensión del archivo
    const filename = `${req.body.title.replace(/\s/g, "-")}_${Date.now()}${extname}`;
    cb(null, filename);
  }
});

export const upload = multer({ storage });


