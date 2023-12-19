import pool from "../database/database.config";
import { Crypto } from "../types/crypto";

const cryptosModels = {
    create: async (crypto: Crypto): Promise<void> => {
        const query = `
        INSERT INTO cryptos(id, name, currentPrice, openingPrice, lowestPrice, highestPrice, imageUrl)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
            id = EXCLUDED.id,
            name = EXCLUDED.name,
            currentPrice = EXCLUDED.currentPrice,
            openingPrice = EXCLUDED.openingPrice,
            lowestPrice = EXCLUDED.lowestPrice,
            highestPrice = EXCLUDED.highestPrice,
            imageUrl = EXCLUDED.imageUrl
    `;
        const values = [crypto.id, crypto.name, crypto.currentPrice, crypto.openingPrice, crypto.lowestPrice, crypto.highestPrice, crypto.imageUrl];
        await pool.query(query, values);
    },

    getAll: async (): Promise<Crypto[]> => {
        const query = 'SELECT * FROM cryptos';
        const res = await pool.query(query);
        return res.rows;
    },

    getBycmids: async (cmids: string): Promise<Crypto[]> => {
        const query = `SELECT * FROM cryptos WHERE id = ANY(string_to_array($1, ','))`;
        const values = [cmids];
        const res = await pool.query(query, values);
        return res.rows;
    },

    getBycmid: async (cmid: string): Promise<Crypto> => {
        const query = 'SELECT * FROM cryptos WHERE id = $1';
        const values = [cmid];
        const res = await pool.query(query, values);
        return res.rows[0];
    },

    deleteCrypto: async (id: string): Promise<void> => {
        const query = 'DELETE FROM cryptos WHERE id = $1';
        const values = [id];
        try {
            await pool.query('DELETE FROM crypto_history WHERE crypto_id = $1', [id]);
            await pool.query(query, values);
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    saveHistory: async (cryptoId: string, period: string, openingPrice: number, highestPrice: number, lowestPrice: number, closingPrice: number, timestamp: Date): Promise<void> => {
        const query = `
          INSERT INTO crypto_history(crypto_id, period, opening_price, highest_price, lowest_price, closing_price, timestamp)
          VALUES($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [cryptoId, period, openingPrice, highestPrice, lowestPrice, closingPrice, timestamp];
        await pool.query(query, values);
    },

    getCryptoHistory: async (cmid: string, period: string): Promise<Crypto[]> => {
        let query = '';
        switch (period) {
            case 'daily':
                query = `
                    SELECT * FROM crypto_history
                    WHERE crypto_id = $1 AND period = 'daily'
                    ORDER BY timestamp DESC
                    LIMIT 60
                `;
                break;
            case 'hourly':
                query = `
                    SELECT * FROM crypto_history
                    WHERE crypto_id = $1 AND period = 'hourly'
                    ORDER BY timestamp DESC
                    LIMIT 48
                `;
                break;
            case 'minute':
                query = `
                    SELECT * FROM crypto_history
                    WHERE crypto_id = $1 AND period = 'minute'
                    ORDER BY timestamp DESC
                    LIMIT 120
                `;
                break;
            default:
                throw { status: 400, message: "Invalid period" };
        }
        const values = [cmid];
        const res = await pool.query(query, values);
        return res.rows;
    }
};

export default cryptosModels;