import { Request, Response } from "express";
import articleModels from "../models/article.model";
import { Article } from "../types/article";

const articleControllers = {
  async getArticleById(req: Request, res: Response) {
    if (!req.params.id) {
      throw { status: 400, message: "One or more params are mising in URL" };
    }
    try {
      const id = decodeURIComponent(req.params.id);
      const article = await articleModels.getById(id);
      if (!article) {
        throw { status: 404, message: "Article not found" };
      }
      res.status(200).json(article);
    } catch (error) {
      console.error(error);
      const status = (error as { status?: number }).status || 500;
      res.status(status).json({ error });
    }
  },

  async getArticlesBykeyword(req: Request, res: Response) {
    let articles: Article[];
    try {
      if (!req.query.keyword) {
        articles = await articleModels.getAll();
      } else {
        const keyword = req.query.keyword as string;
        articles = await articleModels.getByKeyword(keyword);
      }
      if (articles.length === 0) {
        throw { status: 404, message: "Articles not found" };
      }
      res.status(200).json(articles);
    } catch (error) {
      console.error(error);
      const status = (error as { status?: number }).status || 500;
      res.status(status).json({ error });
    }
  },
};

export default articleControllers;
