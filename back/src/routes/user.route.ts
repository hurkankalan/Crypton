import Router from "express";
import userControllers from "../controllers/user.controller";

const allUserRouter = Router();

allUserRouter.get("/", userControllers.getAllUsers);

export default allUserRouter;

// const userRoutes = (app: any) => {
//   app.get("/users", userControllers.getAllUsers);
//   app.get("/users/:id", userControllers.getUserById);
//   app.put("/users/:id", userControllers.updateUser);
//   app.delete("/users/:id", userControllers.deleteUser);
// };
