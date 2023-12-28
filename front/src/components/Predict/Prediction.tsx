import React, { useState, useEffect } from 'react';
import { Prediction } from './types/Prediction';
import axios from 'axios';

const PredictionsComponent: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get<Prediction[]>('http://localhost:8000/api/predict');
        setPredictions(response.data);
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    fetchPredictions();
  }, []);

  return (
    <div>
      <h1>Prévisions Bitcoin</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Prédiction</th>
            <th>Intervalle Bas</th>
            <th>Intervalle Haut</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map(prediction => (
            <tr key={prediction.ds}>
              <td>{prediction.ds}</td>
              <td>{prediction.yhat.toFixed(2)}</td>
              <td>{prediction.yhat_lower.toFixed(2)}</td>
              <td>{prediction.yhat_upper.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionsComponent;
