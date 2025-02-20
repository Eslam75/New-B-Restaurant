import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import { usermodel } from "../model/user.model.js";

export const authMiddle = async (req, res, next) => {
    try {
        const token = req.headers.token; 
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.seucritYtOKENkEY);

        req.userId = decoded.tokenId; 
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};


export const authAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Access denied. Admins only.",
      success: false,
    });
  }
};
