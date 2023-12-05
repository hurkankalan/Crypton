import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/hashPassword";
import { comparePassword } from "../utils/comparePassword";
import userModels from "../models/user.model";
import { NewUser } from "../types/User";

const userControllers = {
  async allUsers(req: Request, res: Response) {
    try {
      const users = await userModels.getAllUsers();

      res.status(200).json(users.rows);
    } catch (error) {
      console.error(error);
      const status = (error as { status?: number }).status || 500;
      res.status(status).json({ error });
    }
  },

  async userById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw { status: 400, message: "One or more params are mising in URL" };
    }

    try {
      const user = await userModels.getUserById(id);

      if (!user.rows[0]) {
        throw { status: 404, message: "User not found" };
      }

      res.status(200).json(user.rows);
    } catch (error) {
      console.error(error);
      const status = (error as { status?: number }).status || 500;
      res.status(status).json({ error });
    }
  },

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email, password } = req.body;

    if (!id) {
      throw { status: 400, message: "One or more params are mising in URL" };
    }

    for (const key in req.body) {
      if (!req.body[key]) {
        throw {
          status: 400,
          message: "One or more data are missing in body's request",
        };
      }
    }

    try {
      const oldUserInfos = await userModels.getUserById(id);

      if (!oldUserInfos.rows[0]) {
        throw { status: 404, message: "User not found" };
      }

      const passwordMatch = await comparePassword(
        password,
        oldUserInfos.rows[0].password
      );

      if (
        username === oldUserInfos.rows[0].username &&
        email === oldUserInfos.rows[0].email &&
        passwordMatch
      ) {
        throw { status: 304, message: "No changes detected, user not updated" };
      } else {
        const newUserInfos: NewUser = {
          username:
            username !== oldUserInfos.rows[0].username
              ? username
              : oldUserInfos.rows[0].username,
          email:
            email !== oldUserInfos.rows[0].email
              ? email
              : oldUserInfos.rows[0].email,
          password: passwordMatch
            ? oldUserInfos.rows[0].password
            : await hashPassword(password),
        };

        const newUser = await userModels.updateUser(
          newUserInfos,
          oldUserInfos.rows[0].id
        );

        if (newUser.rowCount === 0) {
          throw { status: 500, message: "User not updated" };
        } else {
          res.sendStatus(201);
        }
      }
    } catch (error) {
      console.error(error);
      const status = (error as { status?: number }).status || 500;
      res.status(status).json({ error });
    }
  },

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await userModels.getUserById(id);

      if (!user.rows[0]) {
        throw { status: 404, message: "User not found" };
      }

      const deleteUser = await userModels.deleteUser(id);

      if (deleteUser.rowCount === 0) {
        throw { status: 500, message: "User not deleted" };
      } else {
        res.sendStatus(204);
      }

      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      const status = (error as { status?: number }).status || 500;
      res.status(status).json({ error });
    }
  },

  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) {
        throw {
          status: 400,
          message: "One or more data are missing in the body",
        };
      }
    }

    try {
      const user = await userModels.getUserByEmail(email);

      if (user.rows[0]) {
        throw { status: 409, message: "Email already exist" };
      }

      const hashedPassword = await hashPassword(password);

      const newUser: NewUser = {
        username,
        email,
        password: hashedPassword,
      };

      const createdUser = await userModels.insertUser(newUser);

      if (createdUser.rowCount === 0) {
        throw { status: 500, message: "User not created" };
      } else {
        res.sendStatus(201);
      }
    } catch (error) {
      console.error(error);
      const status = (error as { status?: number }).status || 500;
      res.status(status).json({ error });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) {
        throw {
          status: 400,
          message: "One or more data are missing in the body",
        };
      }
    }

    try {
      const user = await userModels.getUserByEmail(email);

      if (!user.rows[0]) {
        throw { status: 404, message: "User not found" };
      }

      const passwordMatch = await comparePassword(
        password,
        user.rows[0].password
      );

      if (!passwordMatch) {
        throw { status: 401, message: "Password incorrect" };
      }

      if (!process.env.PRIVATE_KEY) {
        throw { status: 401, message: "Password incorrect" };
      }

      const token = jwt.sign(
        {
          id: user.rows[0].id,
          role: user.rows[0].role,
        },
        process.env.PRIVATE_KEY,
        { expiresIn: "24h" }
      );

      res.cookie("token", token, { httpOnly: true });

      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      const status = (error as { status?: number }).status || 500;
      res.status(status).json({ error });
    }
  },

  async logout(req: Request, res: Response) {
    res.clearCookie("token");
    res.end();
  },
};

export default userControllers;
