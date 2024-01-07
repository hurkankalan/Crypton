import Router from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";
import userControllers from "../controllers/user.controller";

const allUserRouter = Router();

allUserRouter.get("/", verifyToken, isAdmin, userControllers.allUsers);
allUserRouter.get("/:id", verifyToken, userControllers.userById);
allUserRouter.put(
    "/:id/currency",
    verifyToken,
    userControllers.updateDefaultCurrency
    );
    allUserRouter.put("/:id", verifyToken, userControllers.updateUser);
    allUserRouter.delete("/:id", verifyToken, userControllers.deleteUser);
    allUserRouter.post("/register", userControllers.register);
    allUserRouter.get("/email/:email", userControllers.userByEmail);
    allUserRouter.post("/login", userControllers.login);
    allUserRouter.post("/login/discord", userControllers.loginWithDiscord);
    allUserRouter.post("/logout", userControllers.logout);

export default allUserRouter;
