import Router from "express";
import allUserRouter from "./user.route";
import allArticleRouter from "./articles.route";

const userRouter = Router();

userRouter.use("/users", allUserRouter);
userRouter.use("/articles", allArticleRouter);

export default userRouter;
