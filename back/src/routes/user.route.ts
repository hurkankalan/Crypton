import Router from "express";
import userControllers from "../controllers/user.controller";

const allUserRouter = Router();

allUserRouter.get("/", userControllers.allUsers);
allUserRouter.get("/:id", userControllers.userById);
allUserRouter.put("/:id", userControllers.updateUser);

export default allUserRouter;
