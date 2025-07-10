import { useState } from "react";
import AnalysisContainer from "../components/AnalysisContainer";
import ServiceHeader from "../components/ServiceHeader";

function XRayScan() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return alert("Please upload an image file first.");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/xray/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.response);
    } catch (error) {
      setResult("❌ Error during image analysis.");
    }

    setLoading(false);
  };

  return (
    <main className="m-10 md:m-30 md:-mt-0.5">
      <ServiceHeader
        phrase={"Let AI analyze your"}
        spanPhrase={"X-Ray Report"}
        para={"Upload your X-ray report to get an instant AI analysis."}
      />
      <AnalysisContainer
        reportDets={"X-Ray Report in png / jpg / jpeg format"}
        analysisName={"X-Ray Report"}
        accept={{ "image/*": [] }}
        setFile={setFile}
        handleAnalyze={handleAnalyze}
        result={result}
        loading={loading}
      />
    </main>
  );
}

export default XRayScan;
