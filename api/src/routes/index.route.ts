import Router from "express";
import allUserRouter from "./user.route";
import allArticleRouter from "./articles.route";
import allRssRouter from "./rss.route";

const userRouter = Router();

userRouter.use("/users", allUserRouter);
userRouter.use("/articles", allArticleRouter);
userRouter.use("/rss", allRssRouter);

export default userRouter;
