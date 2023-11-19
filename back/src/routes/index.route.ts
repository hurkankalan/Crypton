import Router from "express";
import allUserRouter from "./user.route";

const userRouter = Router();

userRouter.use("/users", allUserRouter);

export default userRouter;
