import { Request, Response } from "express";
import axios from 'axios';

// URL de l'API Flask où l'endpoint de prédiction est disponible.
const FLASK_API_URL = 'http://flask-api:5000/predict';

// Objet controller pour gérer les requêtes de prédiction.
const predictController = {
    // Fonction asynchrone pour obtenir des prédictions de l'API Flask.
    async getPredictions(req: Request, res: Response): Promise<void> {
        try {
            // Effectue une requête GET vers l'API Flask et attend la réponse.
            const response = await axios.get(FLASK_API_URL);
            // Renvoie les données de la réponse au client qui a initié la requête.
            res.json(response.data);
        } catch (error: any) { // Attrape toute erreur qui pourrait survenir pendant la requête.
            // Affiche l'erreur dans la console du serveur pour le débogage.
            console.error(error);
            // Prépare un message d'erreur, en utilisant le message de l'API Flask si disponible.
            const errorMessage = error.response?.data?.message || 'Unknown error occurred';
            // Renvoie une réponse d'erreur 500 au client avec le message d'erreur.
            res.status(500).send(errorMessage);
        }
    }
};

// Exportation du controller pour être utilisé dans d'autres fichiers, comme les routes d'express.
export default predictController;
