import { Request, Response } from "express";
import articleModels from "../models/article.model";
import { Article } from "../types/article";

const articleControllers = {
  async getArticleById(req: Request, res: Response): Promise<void> {
    if (!req.params.id) {
      throw { status: 400, message: "One or more params are mising in URL" };
    }
    try {
      const id = decodeURIComponent(req.params.id);
      const article = await articleModels.getById(id);
      if (!article) {
        throw { status: 404, message: "Article not found" };
      }
      if(req.cookies === undefined && !article.isVisibleToGuests) {
        throw { status: 401, message: "Unauthorized" };
      }
      res.status(200).json(article);
    } catch (error) {
      console.error(error);
      const status = (error as { status?: number }).status || 500;
      res.status(status).json({ error });
    }
  },

  async getArticlesBykeyword(req: Request, res: Response): Promise<void> {
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
      if (req.cookies === undefined) {
        articles = articles.filter((article) => article.isVisibleToGuests);
      }
      res.status(200).json(articles);
    } catch (error) {
      console.error(error);
      const status = (error as { status?: number }).status || 500;
      res.status(status).json({ error });
    }
  },

  async getAllArticlesTitlesAndVisibilities(req: Request, res: Response): Promise<void> {
    try {
      const articles = await articleModels.getAll();
      if (articles.length === 0) {
        throw { status: 404, message: "Articles not found" };
      }
      const articlesTitlesAndVisibilities = articles.map((article) => {
        return { id: article.id, title: article.title, visible: article.isVisibleToGuests };
      });
      res.status(200).json(articlesTitlesAndVisibilities);
    } catch (error) {
      console.error(error);
      const status = (error as { status?: number }).status || 500;
      res.status(status).json({ error });
    }
  },

  async setVisibility(req: Request, res: Response): Promise<void> {
    if (!req.body.id || req.body.isVisibleToGuests === undefined) {
      throw { status: 400, message: "One or more params are mising in body" };
    }
    try {
      const id = decodeURIComponent(req.body.id);
      const isVisibleToGuests = req.body.isVisibleToGuests;
      await articleModels.setVisibility(id, isVisibleToGuests);
      res.status(200).json({ message: "Visibility updated" });
    } catch (error) {
      console.error(error);
      const status = (error as { status?: number }).status || 500;
      res.status(status).json({ error });
    }
  },
};

export default articleControllers;
