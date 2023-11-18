import { Request, Response } from "express";
import { User } from "../types/User";
import userModels from "../models/user.model";
import { comparePassword } from "../utils/comparePassword";

const userControllers = {
    async getAllUsers(req: Request, res: Response) {
      try {
        const users = await userModels.getAllUsers();
        res.status(200).json(users.rows);
      } catch (err) {
        console.error(err.message);
      }
    },
  //   async getUserById(req: Request, res: Response) {
  //     try {
  //       const { id } = req.params;
  //       const user = await userModels.getUserById(id);
  //       res.json(user.rows[0]);
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   },
  //   async updateUser(req: Request, res: Response) {
  //     try {
  //       const { id } = req.params;
  //       const { username, email, password, role } = req.body;
  //       const hashedPassword = await comparePassword(password, password);
  //       const user: User = {
  //         username,
  //         email,
  //         password: hashedPassword,
  //         role,
  //       };
  //       await userModels.updateUser(user, Number(id));
  //       res.json("User updated successfully");
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   },
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
