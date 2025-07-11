import React, { useState } from "react";
import Select from "react-select";
import Card from "../components/Card";
import axios from "axios";

// Static symptom options
const symptoms = [
  "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering", "chills",
  "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue", "muscle_wasting", "vomiting",
  "burning_micturition", "spotting_ urination", "fatigue", "weight_gain", "anxiety",
  "cold_hands_and_feets", "mood_swings", "weight_loss", "restlessness", "lethargy", "patches_in_throat",
  "irregular_sugar_level", "cough", "high_fever", "sunken_eyes", "breathlessness", "sweating",
  "dehydration", "indigestion", "headache", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite",
  "pain_behind_the_eyes", "back_pain", "constipation", "abdominal_pain", "diarrhoea", "mild_fever",
  "yellow_urine", "yellowing_of_eyes", "acute_liver_failure", "fluid_overload", "swelling_of_stomach",
  "swelled_lymph_nodes", "malaise", "blurred_and_distorted_vision", "phlegm", "throat_irritation",
  "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion", "chest_pain", "weakness_in_limbs"
];

const options = symptoms.map(symptom => ({
  label: symptom.replaceAll("_", " "),
  value: symptom
}));

function SymptomChecker() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOptions.length === 0) return alert("Please select symptoms.");

    const selectedSymptoms = selectedOptions.map(opt => opt.value);
    setLoading(true);
    setPrediction(null);

    try {
      const res = await axios.post("http://localhost:5000/disease/predict-symptoms", {
        symptoms: selectedSymptoms,
      });
      setPrediction(res.data);
    } catch (err) {
      setPrediction({
        error: err?.response?.data?.error || "Something went wrong while predicting.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="m-10 md:m-30 md:-mt-0.5">
      <ServiceHeader
        phrase={"Let AI evaluate your Symptoms and Predict your possible"}
        spanPhrase={"Disease"}
        para={"Enter your symptoms to get an AI-based prediction of your potential condition, with suggestions on care, diet, and more."}
      />

      <form className="space-y-5 my-8" onSubmit={handleSubmit}>
        <h3 className="text-teal-700 text-center text-2xl font-semibold mt-8 mb-6 lg:text-4xl">
          Select your Symptoms
        </h3>

        <div className="max-w-3xl mx-auto">
          <Select
            options={options}
            isMulti
            onChange={setSelectedOptions}
            placeholder="Type or select symptoms..."
            className="mb-4 text-black"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-6 bg-teal-600 shadow hover:bg-teal-700 text-white font-bold rounded-lg transition duration-200"
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>

      <h3 className="text-teal-700 text-center text-2xl font-semibold mt-8 mb-6 lg:text-4xl">
        Evaluation of your Symptoms
      </h3>

      <div className="ai-response-container bg-gradient-to-br from-blue-900 via-teal-600 to-blue-900 rounded-xl p-5 my-6 max-h-[500px] overflow-y-auto">
        {prediction ? (
          prediction.error ? (
            <p className="text-center text-red-200 font-semibold">{prediction.error}</p>
          ) : (
            <div className="flex flex-col items-center text-white">
              <Card heading={"Predicted Disease:"} para={prediction.disease} />

              <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-6">
                <Card paraHeading={"Description:"} para={prediction.description} />
                <Card paraHeading={"Precautions:"} para={prediction.precautions?.join(", ") || "-"} />
                <Card paraHeading={"Medications:"} para={prediction.medications?.join(", ") || "-"} />
                <Card paraHeading={"Diets:"} para={prediction.diets?.join(", ") || "-"} />
                <Card paraHeading={"Workout:"} para={prediction.workout?.join(", ") || "-"} />
              </div>
            </div>
          )
        ) : (
          <h3 className="text-center text-white">The Evaluation will generate here</h3>
        )}
      </div>
    </main>
  );
}

export default SymptomChecker;
