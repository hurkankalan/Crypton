import { Request, Response } from "express";
import rssModels from "../models/rss.model";
import { rss } from "../types/Rss";
import axios from 'axios';
import xml2js from 'xml2js';

const rssControllers = {
    async getRss(req: Request, res: Response): Promise<void> {
        let rss: rss[];
        try {
            rss = await rssModels.getAll();
            if (rss.length === 0) {
                throw { status: 404, message: "rss not found" };
            }
            res.status(200).json(rss);
        } catch (error) {
            console.error(error);
            const status = (error as { status?: number }).status || 500;
            res.status(status).json({ error });
        }
    },

    async createRss(req: Request, res: Response): Promise<void> {
        try {
            const rss = req.body as rss;
            const response = await axios.get(rss.url);
            const contentType = response.headers['content-type'];
            if (!contentType || !contentType.includes('application/rss+xml') && !contentType.includes('application/rdf+xml') && !contentType.includes('application/atom+xml') && !contentType.includes('application/xml')) {
                throw { status: 400, message: 'URL is not an RSS feed' };
            }
            const parser = new xml2js.Parser();
            try {
                await parser.parseStringPromise(response.data);
            } catch (err) {
                throw { status: 400, message: 'URL does not contain valid XML' };
            }
            await rssModels.create(rss);
            res.status(201).json({ message: "rss created" });
        } catch (error) {
            console.error(error);
            const status = (error as { status?: number }).status || 500;
            res.status(status).json({ error });
        }
    },

    async deleteRss(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id) {
                throw { status: 400, message: "One or more params are missing in URL" };
            }
            const id = parseInt(req.params.id);
            await rssModels.deleteById(id);
            res.status(200).json({ message: "rss deleted" });
        } catch (error) {
            console.error(error);
            const status = (error as { status?: number }).status || 500;
            res.status(status).json({ error });
        }
    }
};

export default rssControllers;