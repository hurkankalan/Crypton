import React, { useState, useEffect, useRef } from 'react';
import { Prediction } from './types/Prediction';
import { Chart as ChartJS, registerables, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, Chart, ChartOptions } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { useMemo } from 'react';
import './Prediction.scss'; 

// Enregistrement des composants de Chart.js nécessaires pour la construction des graphiques.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartDataLabels,
  ...registerables
);

// Définition du composant fonctionnel PredictionsComponent.
const PredictionsComponent: React.FC = () => {
  // État pour stocker les prédictions et contrôler les requêtes d'API en cours.
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  // Chargement des prédictions à partir de localStorage ou appel de l'API au montage.
  useEffect(() => {
    const lastFetchDate = localStorage.getItem('lastFetchDate');
    const today = new Date().toISOString().slice(0, 10); // Format de date ISO standard.

    // Si la dernière date de récupération est aujourd'hui, utilisez les données enregistrées.
    if (lastFetchDate === today) {
      const storedPredictions = localStorage.getItem('predictions');
      if (storedPredictions) {
        setPredictions(JSON.parse(storedPredictions)); // Parse les prédictions stockées et mettez à jour l'état.
      }
    }
  }, []);

  // Récupération des prédictions depuis l'API.
  const fetchPredictions = async () => {
    const lastFetchDate = localStorage.getItem('lastFetchDate');
    const today = new Date().toISOString().slice(0, 10);

    // Vérifiez si des prédictions ont déjà été récupérées aujourd'hui.
    if (lastFetchDate === today) {
      toast.info("Vous avez déjà effectué une prédiction aujourd'hui."); // Notification utilisateur.
      return;
    }

    // Marquer le début d'une requête d'API.
    setIsFetching(true);
    try {
      // Faire une requête GET à l'API et traiter la réponse.
      const response = await axios.get<Prediction[]>('http://localhost:8000/api/predict');
      setPredictions(response.data); // Mise à jour de l'état avec les nouvelles prédictions.
      // Stockage des prédictions et de la date de récupération dans localStorage.
      localStorage.setItem('predictions', JSON.stringify(response.data));
      localStorage.setItem('lastFetchDate', today);
      toast.success("Prédiction mise à jour."); // Notification de succès.
    } catch (error) {
      // Gestion des erreurs lors de la requête API.
      console.error("Error fetching predictions:", error);
      toast.error("Erreur lors de la récupération des prédictions."); // Notification d'erreur.
    } finally {
      setIsFetching(false); // Réinitialisation de l'état de la requête d'API.
    }
  };

  // Référence pour l'instance du graphique pour la détruire lors du démontage du composant.
  const chartRef = useRef<Chart | null>(null);
  useEffect(() => {
    return () => {
      // Destruction de l'instance du graphique pour éviter les fuites de mémoire.
      chartRef.current?.destroy();
    };
  }, []);

  // Calcul du message conseil basé sur les prédictions.
  const shouldInvestMessage = useMemo(() => {
    // Comparaison entre la dernière et la première prédiction pour déterminer la tendance.
    if (predictions.length > 0) {
      const lastDayPrediction = predictions[predictions.length - 1].yhat;
      const firstDayPrediction = predictions[0].yhat;
      // Message de conseil pour investir ou non selon que la tendance est à la hausse ou à la baisse.
      return lastDayPrediction > firstDayPrediction
        ? "Prophet vous conseille d'investir, la tendance est à la hausse."
        : "Prophet vous conseille de ne pas investir, la tendance est à la baisse.";
    }
    return "";
  }, [predictions]);

  // Configuration des options du graphique Line.
  const options: ChartOptions<'line'> = useMemo(() => ({
    plugins: {
      datalabels: {
        color: '#444', // Couleur du texte des labels de données.
        font: {
          weight: 'bold', // Poids de la police pour les labels de données.
        },
        formatter: (value: number): string => value.toFixed(2), // Formatage des labels de données.
        anchor: 'end', // Position d'ancrage des labels de données.
        align: 'end', // Alignement des labels de données.
      },
    },
    scales: {
      y: {
        beginAtZero: false, // Débuter l'échelle Y à la première valeur non nulle.
        ticks: {
          callback: (value: number): string => `${(value / 1000).toFixed(1)}K $`, // Formatage des étiquettes de l'échelle Y.
        },
      },
      x: {
        // Les options pour l'axe X sont omises ici pour la clarté du code.
      },
    },
    maintainAspectRatio: false, // Désactiver le maintien de l'aspect ratio pour le graphique.
  }), [predictions]);

  // Construction des données pour le graphique.
  const data = {
    labels: predictions.map(p => moment(p.ds).format('DD/MM')), // Formatage des dates pour l'axe X.
    datasets: [{
      label: 'Prédiction du cours du Bitcoin par Prophet', // Titre du dataset.
      data: predictions.map(p => p.yhat), // Données du graphique.
      borderColor: 'gold', // Couleur de la ligne du graphique.
      backgroundColor: 'rgba(255, 215, 0, 0.2)', // Couleur de fond des points du graphique.
      pointRadius: 10, // Rayon des points sur le graphique.
    }],
  };

  // Clé unique pour le composant Line pour forcer le re-render lors de la mise à jour des données.
  const key = useMemo(() => predictions.length, [predictions]);

  // Rendu du composant avec le titre, le bouton, le message conseil, le graphique et les notifications.
  return (
    <div className="predictions-container">
      <h1 className="title">Prévisions Bitcoin</h1>
      <button className="fetch-button" onClick={fetchPredictions}>Obtenir les Prévisions</button>
      <div className="advice-text">{shouldInvestMessage}</div> // Affichage du message conseil.
      <div className="chart-container">
        <Line key={key} data={data} options={options}/> // Le graphique Line avec les données et les options.
      </div>
      <ToastContainer position="top-center" autoClose={5000} /> // Conteneur pour les notifications.
    </div>
  );
};

// Exportation du composant pour utilisation ailleurs dans l'application.
export default PredictionsComponent;