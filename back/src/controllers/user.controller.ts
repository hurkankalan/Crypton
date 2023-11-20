import { Request, Response } from "express";
import { hashPassword } from "../utils/hashPassword";
import { comparePassword } from "../utils/comparePassword";
import userModels from "../models/user.model";
import { User, NewUser } from "../types/User";

const userControllers = {
  async allUsers(req: Request, res: Response) {
    try {
      const users = await userModels.getAllUsers();

      res.status(200).json(users.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
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
      const user = await userModels.getUserById(id);

      if (!user.rows[0]) {
        res.status(404).json({ error: "User not found" });
        return;
      } else {
        res.status(200).json(user.rows);
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
      return;
    }
  },

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email, password } = req.body;

    if (!id) {
      res.status(400).json({ error: "One or more params are mising in URL" });
      return;
    }

    try {
      const oldUserInfos = await userModels.getUserById(id);

      const passwordMatch = await comparePassword(
        password,
        oldUserInfos.rows[0].password
      );

      if (
        username === oldUserInfos.rows[0].username &&
        email === oldUserInfos.rows[0].email &&
        passwordMatch
      ) {
        res
          .status(304)
          .json({ error: "No changes detected, user not updated" });
        return;
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

        await userModels.updateUser(newUserInfos, oldUserInfos.rows[0].id);

        res.sendStatus(201);
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
      return;
    }
  },

  //   async deleteUser(req: Request, res: Response) {
  //     try {
  //       const { id } = req.params;
  //       await userModels.deleteUser(Number(id));
  //       res.json("User deleted successfully");
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   },
};

export default userControllers;
