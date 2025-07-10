from flask import Blueprint, request, jsonify
import numpy as np
import pickle
import pandas as pd
import os
from sklearn.preprocessing import LabelEncoder
from gemini_helper import extract_symptoms_from_text

disease_bp = Blueprint("disease", __name__)

# Load trained model
model_path = os.path.join("models", "svc.pkl")
svc = pickle.load(open(model_path, "rb"))

# Load data
data_path = "data"
description = pd.read_csv(os.path.join(data_path, "description.csv"))
precautions = pd.read_csv(os.path.join(data_path, "precautions_df.csv"))
workout = pd.read_csv(os.path.join(data_path, "workout_df.csv"))
medications = pd.read_csv(os.path.join(data_path, "medications.csv"))
diets = pd.read_csv(os.path.join(data_path, "diets.csv"))
sym_df = pd.read_csv(os.path.join(data_path, "symtoms_df.csv"))
training_df = pd.read_csv(os.path.join(data_path, "Training.csv"))

# Map symptoms to indices
symptoms_dict = {symptom: idx for idx, symptom in enumerate(training_df.columns[:-1])}
all_symptoms = list(symptoms_dict.keys())

# Map label-encoded diseases
le = LabelEncoder()
le.fit(training_df['prognosis'])
diseases_list = {i: label for i, label in enumerate(le.classes_)}


def get_disease_info(predicted_disease):
    desc = description[description['Disease'] == predicted_disease]['Description'].values
    desc = desc[0] if len(desc) else "No description available."

    pre = precautions[precautions['Disease'] == predicted_disease][[
        'Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']].values.tolist()
    pre = pre[0] if pre else []

    med = medications[medications['Disease'] == predicted_disease]['Medication'].values.tolist()
    die = diets[diets['Disease'] == predicted_disease]['Diet'].values.tolist()
    wrkout = workout[workout['disease'] == predicted_disease]['workout'].values.tolist()

    return desc, pre, med, die, wrkout


# 🔹 Text-based prediction (Gemini input)
@disease_bp.route("/predict", methods=["POST"])
def predict_disease():
    try:
        data = request.get_json()
        user_text = data.get("text", "")

        matched_symptoms = extract_symptoms_from_text(user_text, all_symptoms)
        print("Matched symptoms from Gemini:", matched_symptoms)

        if not matched_symptoms:
            return jsonify({"error": "No recognizable symptoms found."}), 400

        input_vector = np.zeros(len(symptoms_dict))
        for s in matched_symptoms:
            if s in symptoms_dict:
                input_vector[symptoms_dict[s]] = 1

        predicted_index = svc.predict([input_vector])[0]
        predicted_disease = diseases_list[predicted_index]

        desc, pre, med, die, wrkout = get_disease_info(predicted_disease)

        return jsonify({
            "disease": predicted_disease,
            "description": desc,
            "precautions": pre,
            "medications": med,
            "diets": die,
            "workout": wrkout
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 🔹 Direct symptom selection (e.g. dropdown)
@disease_bp.route("/predict-symptoms", methods=["POST"])
def predict_from_symptoms():
    try:
        data = request.get_json()
        symptoms = data.get("symptoms", [])

        if not symptoms:
            return jsonify({"error": "No symptoms provided."}), 400

        input_vector = np.zeros(len(symptoms_dict))
        for s in symptoms:
            if s in symptoms_dict:
                input_vector[symptoms_dict[s]] = 1

        predicted_index = svc.predict([input_vector])[0]
        predicted_disease = diseases_list[predicted_index]
        desc, pre, med, die, wrkout = get_disease_info(predicted_disease)

        return jsonify({
            "disease": predicted_disease,
            "description": desc,
            "precautions": pre,
            "medications": med,
            "diets": die,
            "workout": wrkout
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
