import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const [, token] = req.headers.authorization.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    const user = {
      //@ts-ignore
      id: decoded.id,
    };

    //@ts-ignore
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { AuthMiddleware };
