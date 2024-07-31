import { upload } from "../../middlewares/uploader.js";
import CustomRouter from "../CustomRouter.js";
import { verifyToken } from "../../utils/token.js";

class UploadImageRouter extends CustomRouter {
  init() {
    this.create("/", ["USER"], upload.single("photo"), async (req, res) => {
      const token = req.signedCookies.token;

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      try {
        const decoded = verifyToken(token);
        req.user = decoded;
        res.json({
          filename: req.file.filename,
          user_id: req.user.user_id
        });
      } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid token" });
      }
    });
  }
}

const uploadImageRouter = new UploadImageRouter();
export default uploadImageRouter.getRouter();
