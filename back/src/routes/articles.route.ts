import Router from "express";
import articleControllers from "../controllers/articles.controller";

const allArticleRouter = Router();

allArticleRouter.get("/byid/:id", articleControllers.getArticleById);
allArticleRouter.get("/search", articleControllers.getArticlesBykeyword);

export default allArticleRouter;

