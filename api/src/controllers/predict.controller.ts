import { Request, Response } from "express";
import axios from 'axios';

const FLASK_API_URL = 'http://flask-api:5000/predict';

const predictController = {
    async getPredictions(req: Request, res: Response): Promise<void> {
        try {
            const response = await axios.get(FLASK_API_URL);
            res.json(response.data);
        } catch (error: any) {  
            console.error(error);
            const errorMessage = error.response?.data?.message || 'Unknown error occurred';
            res.status(500).send(errorMessage);
        }
    }
};

export default predictController;
