import Router from "express";
import allUserRouter from "./user.route";
import allArticleRouter from "./articles.route";
import allRssRouter from "./rss.route";
import allWalletRouter from "./wallet.route";

const userRouter = Router();

userRouter.use("/users", allUserRouter);
userRouter.use("/articles", allArticleRouter);
userRouter.use("/rss", allRssRouter);
userRouter.use("/wallet", allWalletRouter);

export default userRouter;
