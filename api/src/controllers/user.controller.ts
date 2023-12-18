import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/hashPassword";
import { comparePassword } from "../utils/comparePassword";
import userModels from "../models/user.model";
import walletModels from "../models/wallet.model";
import { User } from "../types/User";

const userControllers = {
  async allUsers(req: Request, res: Response) {
    try {
      const users = await userModels.getAllUsers();

      res.status(200).json(users.rows);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
      return;
    }
  },

  async userById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "One or more params are mising in URL" });
      return;
    }

    try {
      const user = await userModels.getUserById(parseInt(id));

      if (!user.rows[0]) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json(user.rows);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
      return;
    }
  },

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email, password, currency } = req.body;

    if (!id) {
      res.status(400).json({ error: "One or more params are mising in URL" });
      return;
    }

    for (const key in req.body) {
      if (!req.body[key]) {
        res
          .status(400)
          .json({ error: "One or more data are missing in body's request" });
        return;
      }
    }

    try {
      const oldUserInfos = await userModels.getUserById(parseInt(id));

      if (!oldUserInfos.rows[0]) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const passwordMatch = await comparePassword(
        password,
        oldUserInfos.rows[0].password
      );

      if (
        username === oldUserInfos.rows[0].username &&
        email === oldUserInfos.rows[0].email &&
        passwordMatch &&
        currency === oldUserInfos.rows[0].currency
      ) {
        res
          .status(304)
          .json({ error: "No changes detected, user not updated" });
        return;
      } else {
        const newUserInfos = {
          id: oldUserInfos.rows[0].id,
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
          currency:
            currency !== oldUserInfos.rows[0].currency
              ? currency
              : oldUserInfos.rows[0].currency,
        };

        const newUser = await userModels.updateUser(newUserInfos);

        if (newUser.rowCount === 0) {
          res.status(500).json({ error: "User not updated" });
          return;
        } else {
          res.status(201).json({ data: newUser });
          return;
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
      return;
    }
  },

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await userModels.getUserById(parseInt(id));

      if (!user.rows[0]) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const deleteUser = await userModels.deleteUser(parseInt(id));

      if (deleteUser.rowCount === 0) {
        res.status(500).json({ error: "User not deleted" });
        return;
      } else {
        res.status(200).json({ message: "User is deleted" });
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
      return;
    }
  },

  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) {
        res
          .status(400)
          .json({ error: "One or more data are missing in the body" });
        return;
      }
    }

    try {
      const user = await userModels.getUserByEmail(email);

      if (user.rows[0]) {
        res.status(409).json({ error: "Email already exist" });
        return;
      }

      const hashedPassword = await hashPassword(password);

      const newUser: User = {
        id: 0,
        username,
        email,
        password: hashedPassword,
      };

      const createdUser = await userModels.insertUser(newUser);

      if (createdUser.rowCount === 0) {
        res.status(500).json({ error: "User not created" });
        return;
      } else {
        const user = await userModels.getUserByEmail(email);
        const wallet = await walletModels.createWallet(user.rows[0].id);

        console.log({ user, wallet });

        res.status(201).json({ data: user });
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
      return;
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) {
        res
          .status(400)
          .json({ error: "One or more data are missing in the body" });
      }
    }

    try {
      const user = await userModels.getUserByEmail(email);

      if (!user.rows[0]) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      if (user.rows[0].connectType === 1) {
        res.status(403).json({ error: "You can't connect with this method" });
        return;
      }

      const passwordMatch = await comparePassword(
        password,
        user.rows[0].password
      );

      if (!passwordMatch) {
        res.status(404).json({ error: "Password incorrect" });
        return;
      }

      if (!process.env.PRIVATE_KEY) {
        res.status(404).json({ error: "Private key is missing" });
        return;
      }

      const token = jwt.sign(
        {
          id: user.rows[0].id,
          username: user.rows[0].username,
          role: user.rows[0].role,
          connectType: user.rows[0].connectType,
          currency: user.rows[0].currency,
        },
        process.env.PRIVATE_KEY,
        { expiresIn: "24h" }
      );

      res.cookie("token", token);
      res.status(200).json({ message: "User is connected" });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
      return;
    }
  },

  async loginWithDiscord(req: Request, res: Response) {
    const { username, email } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) {
        res
          .status(400)
          .json({ error: "One or more data are missing in the body" });
      }
    }

    try {
      const user = await userModels.getUserByEmail(email);

      if (!user.rows[0]) {
        const newUser: User = {
          id: 0,
          username,
          email,
          password: "",
        };

        const createdUser = await userModels.insertUserWithDiscord(newUser);

        if (createdUser.rowCount === 0) {
          res.status(500).json({ error: "User not created" });
          return;
        } else {
          const user = await userModels.getUserByEmail(email);
          const wallet = await walletModels.createWallet(user.rows[0].id);

          console.log({ user, wallet });

          res.status(201).json({ data: user });
          return;
        }
      }

      if (!process.env.PRIVATE_KEY) {
        res.status(404).json({ error: "Private key is missing" });
        return;
      }

      const token = jwt.sign(
        {
          id: user.rows[0].id,
          role: user.rows[0].role,
        },
        process.env.PRIVATE_KEY,
        { expiresIn: "24h" }
      );

      res.cookie("token", token);
      res.status(200).json({ message: "User is connected" });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
      return;
    }
  },

  async logout(req: Request, res: Response) {
    res.clearCookie("token");
    res.status(200).json({ message: "User is disconnected" });
    return;
  },

  async updateDefaultCurrency(req: Request, res: Response) {
    const { currency } = req.body;
    const { id } = req.params;

    if (!currency || !id) {
      res
        .status(400)
        .json({ error: "One or more params are mising in URL or in body" });
      return;
    }

    try {
      const user = await userModels.getUserById(parseInt(id));

      if (!user.rows[0]) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const updatedUser = await userModels.updateDefaultCurrency(
        currency,
        parseInt(id)
      );

      if (updatedUser.rowCount === 0) {
        res.status(500).json({ error: "User not updated" });
        return;
      } else {
        res.status(200).json({ data: updatedUser });
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
      return;
    }
  },

  async userByEmail(req: Request, res: Response) {
    const { email } = req.params;

    if (!email) {
      res.status(400).json({ error: "One or more params are mising in URL" });
      return;
    }

    try {
      const user = await userModels.getUserByEmail(email);

      if (user.rows[0]) {
        res.status(200).json({ message: "User is exist" });
        return;
      } else {
        res.status(404).json({ error: "User not exist" });
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
      return;
    }
  },
};

export default userControllers;
