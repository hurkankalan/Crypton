import Router from "express";
import rssControllers from "../controllers/rss.controller";

const allRssRouter = Router();

allRssRouter.get("/", rssControllers.getRss);
allRssRouter.post("/", rssControllers.createRss);
allRssRouter.delete("/:id", rssControllers.deleteRss);

export default allRssRouter;

