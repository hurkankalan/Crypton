import { Request, Response } from "express";
import articleModels from "../models/article.model";

const articleControllers = {

    async getArticleById(req: Request, res: Response) {
        try {
            const id = decodeURIComponent(req.params.id);
            const article = await articleModels.getById(id);
            res.status(200).json(article);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    async getArticlesBykeyword(req: Request, res: Response) {
        try {
            const keyword = req.query.keyword as string;
            const articles = await articleModels.getByKeyword(keyword);
            res.status(200).json(articles);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

export default articleControllers;