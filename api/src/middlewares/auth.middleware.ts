import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;
  try {
    if (token) {
      const privateKey = process.env.PRIVATE_KEY;

      if (!privateKey) {
        throw { status: 500, message: "Private key is not present" };
      }

      const decodedToken = jwt.verify(token, privateKey);

      if (decodedToken) {
        next();
      } else {
        throw { status: 403, message: "Unauthorized because token is invalid" };
      }
    } else {
      throw { status: 401, message: "No tokens provided" };
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error });
  }
}
