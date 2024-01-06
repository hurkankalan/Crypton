import Router from "express";
import rssControllers from "../controllers/rss.controller";
import { isAdmin } from "../middlewares/admin.middleware";
import { verifyToken } from "../middlewares/auth.middleware";

const allRssRouter = Router();

allRssRouter.get("/", verifyToken, isAdmin, rssControllers.getRss);
allRssRouter.post("/", verifyToken, isAdmin, rssControllers.createRss);
allRssRouter.delete("/:id", verifyToken, isAdmin, rssControllers.deleteRss);

export default allRssRouter;

