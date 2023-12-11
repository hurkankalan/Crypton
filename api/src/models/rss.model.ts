import pool from "../database/database.config";
import { rss} from "../types/Rss";

const rssModels = {
    
    create: async (rss: rss) => {
        const query = `
        INSERT INTO rss(url)
        VALUES($1)
        `;
        const values = [rss.url];
        await pool.query(query, values);
    },

    getAll: async (): Promise<rss[]> => {
        const query = 'SELECT * FROM rss';
        const res = await pool.query(query);
        return res.rows;
    },

    deleteById: async (id: number): Promise<rss> => {
        const query = 'DELETE FROM rss WHERE id = $1';
        const values = [id];
        const res = await pool.query(query, values);
        return res.rows[0];
    }
};

export default rssModels;