import Router from "express";
import articleControllers from "../controllers/articles.controller";
import { isAdmin } from "../middlewares/admin.middleware";
import { verifyToken } from "../middlewares/auth.middleware";

const allArticleRouter = Router();

allArticleRouter.get("/byid/:id", articleControllers.getArticleById);
allArticleRouter.get("/search", articleControllers.getArticlesBykeyword);
allArticleRouter.get("/visibileArticles", verifyToken, isAdmin, articleControllers.getAllArticlesTitlesAndVisibilities);
allArticleRouter.put("/visibility", verifyToken, isAdmin, articleControllers.setVisibility);

export default allArticleRouter;

