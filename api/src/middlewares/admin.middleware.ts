import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;

  const decodedToken = jwt.decode(token) as any;

  try {
    if (decodedToken.role === "admin") {
      next();
    } else {
      throw {
        status: 403,
        message: "Unauthorized because you are not an admin",
      };
    }
  } catch (error) {
    console.error(error);
    const status = (error as { status?: number }).status || 500;
    res.status(status).json({ error });
  }
}
