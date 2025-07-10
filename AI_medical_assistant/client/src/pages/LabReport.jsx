import { useState } from "react";
import AnalysisContainer from "../components/AnalysisContainer";
import ServiceHeader from "../components/ServiceHeader";

function LabReport() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return alert("Please select a PDF file.");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/lab/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.response);
    } catch (error) {
      setResult("Error occurred during analysis.");
    }

    setLoading(false);
  };

  return (
    <main className="m-10 md:m-30 md:-mt-0.5">
      <ServiceHeader
        phrase={"Let AI analyze your"}
        spanPhrase={"Lab Reports"}
        para={
          "Upload your Lab Report in PDF format and receive an AI-generated summary of its contents."
        }
      />
      <AnalysisContainer
        reportDets={"Lab Report in PDF format"}
        analysisName={"Lab Report"}
        accept={{ "application/pdf": [] }}
        setFile={setFile}
        handleAnalyze={handleAnalyze}
        result={result}
        loading={loading}
      />
    </main>
  );
}

export default LabReport;
