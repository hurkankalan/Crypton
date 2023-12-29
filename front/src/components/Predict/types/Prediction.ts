export interface Prediction {
    ds: string;         // La date de la prédiction
    yhat: number;       // La valeur prédite
    yhat_lower: number; // La limite inférieure de l'intervalle d'incertitude
    yhat_upper: number; // La limite supérieure de l'intervalle d'incertitude
  }
  