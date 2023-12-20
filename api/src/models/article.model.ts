import pool from "../database/database.config";
import { Article } from "../types/Article";

const articleModels = {
  create: async (article: Article) => {
    const query = `
    INSERT INTO articles(id, title, summary, source, date, pageUrl, imageUrl) 
    VALUES($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      summary = EXCLUDED.summary,
      source = EXCLUDED.source,
      date = EXCLUDED.date,
      pageUrl = EXCLUDED.pageUrl,
      imageUrl = EXCLUDED.imageUrl
  `;
    const values = [article.id, article.title, article.summary, article.source, article.date, article.pageUrl, article.imageUrl];
    await pool.query(query, values);
  },

  getAll: async (): Promise<Article[]> => {
      const query = 'SELECT * FROM articles';
      const res = await pool.query(query);
      return res.rows;
  },

  getById: async (id: string): Promise<Article> => {
      const query = 'SELECT * FROM articles WHERE id = $1';
      const values = [id];
      const res = await pool.query(query, values);
      return res.rows[0];
  },

  setVisibility: async (id: string, isVisibleToGuests: boolean): Promise<void> => {
      const query = 'UPDATE articles SET isVisibleToGuests = $1 WHERE id = $2';
      const values = [isVisibleToGuests, id];
      await pool.query(query, values);
  },

  getByKeyword: async (keywords: string): Promise<Article[]> => {
    const keywordArray = keywords.split(',');
    let query = 'SELECT * FROM articles WHERE ';
    const values: string[] = [];

    keywordArray.forEach((keyword, index) => {
        const valueIndex = index + 1;
        query += `(title ILIKE $${valueIndex} OR summary ILIKE $${valueIndex} OR source ILIKE $${valueIndex})`;
        if (index !== keywordArray.length - 1) {
            query += ' OR ';
        }
        values.push(`%${keyword}%`);
    });

    const res = await pool.query(query, values);
    return res.rows;
  },
};

export default articleModels;