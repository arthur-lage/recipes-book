import { Request, Response } from "express";
import { prisma } from "../prisma";

import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { verifyEmail } from "../utils/verifyEmail";

const UserController = {
  async getAll(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();

      return res.status(200).json(users);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async authenticate(req: Request, res: Response) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          // @ts-ignore
          id: req.user!.id,
        },
      });

      if (!user)
        return res.status(401).json({ message: "Couldn't authenticate user." });

      const userInfo = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      return res.status(200).json({
        message: "User authenticated successfully.",
        user: userInfo,
      });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Name, email or password fields are missing." });
      }

      if (!verifyEmail(email)) {
        return res.status(400).json({ message: "Email is not valid." });
      }

      const isEmailTaken = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (isEmailTaken !== null) {
        return res.status(409).json({ message: "Email is already taken." });
      }

      const hashedPassword = await hash(password, 10);

      const newUser = {
        name,
        email,
        password: hashedPassword,
      };

      const createdUser = await prisma.user.create({
        data: newUser,
      });

      const token = sign({ id: createdUser.id }, process.env.JWT_SECRET!, {
        expiresIn: "3d",
      });

      return res
        .status(200)
        .json({ token: token, message: "User created successfully" });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email or password fields are missing." });
      }

      if (!verifyEmail(email)) {
        return res.status(400).json({ message: "Email is not valid." });
      }

      const existentUser = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (existentUser === null) {
        return res.status(401).json({ message: "Invalid email/password" });
      }

      const hashedPassword = await compare(password, existentUser.password);

      if (!hashedPassword) {
        return res.status(401).json({ message: "Invalid email/password" });
      }

      const token = sign({ id: existentUser.id }, process.env.JWT_SECRET!, {
        expiresIn: "3d",
      });

      return res
        .status(200)
        .json({ token: token, message: "Logged in successfully" });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async deleteAll(req: Request, res: Response) {
    try {
      await prisma.user.deleteMany();

      return res.status(200).json({ message: "Users deleted successfully" });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.user.delete({
        where: {
          id,
        },
      });

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
};

export { UserController };
