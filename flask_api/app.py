from flask import Flask, jsonify
import pickle
from datetime import datetime
import pandas as pd

app = Flask(__name__)

# Charger le modèle sauvegardé
with open("models/prophet_model.pkl", "rb") as f:
    model = pickle.load(f)


@app.route("/predict")
def predict():
    # Déterminer la date de début pour les prévisions
    last_date = model.history_dates.max()  # La dernière date des données d'entraînement
    start_date = max(
        last_date, pd.Timestamp(datetime.now())
    )  # Commencer à partir de la dernière date ou d'aujourd'hui

    # Créer un DataFrame pour les 7 prochains jours
    future_dates = pd.date_range(start=start_date, periods=7, freq="D")
    future = pd.DataFrame({"ds": future_dates})

    # Faire des prévisions avec le modèle
    forecast = model.predict(future)

    # Convertir les prévisions en réponse JSON
    predictions = forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail(7)
    return jsonify(predictions.to_dict("records"))


if __name__ == "__main__":
    app.run(debug=True)
