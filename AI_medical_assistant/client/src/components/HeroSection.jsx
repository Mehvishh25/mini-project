import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    img: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
    title: "Expert Consultation",
    desc: "Text-based diagnosis using Fine-Tuned Medical LLM",
    link: "/ExpertConsultation",
  },
  {
    img: "https://images.pexels.com/photos/7088521/pexels-photo-7088521.jpeg",
    title: "Visual Diagnosis",
    desc: "Image/Audio RAG-Enhanced Assistant",
    link: "/VisualDiagnosis",
  },
  {
    img: "https://images.pexels.com/photos/8376295/pexels-photo-8376295.jpeg",
    title: "Disease Predictor",
    desc: "Medical System gives detected disease",
    link: "/DiseasePredictor",
  },
  {
    img: "https://images.pexels.com/photos/7088487/pexels-photo-7088487.jpeg",
    title: "X-ray Analysis",
    desc: "Let AI scan and analyze your X-ray Reports",
    link: "/XRayScan",
  },
  {
    img: "https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg",
    title: "Lab Report Analysis",
    desc: "Get your Medical Tests Analysed by AI",
    link: "/LabReportAnalysis",
  },
  {
    img: "https://images.pexels.com/photos/5938360/pexels-photo-5938360.jpeg",
    title: "Diet & Lifestyle Coach",
    desc: "Personalized Coaching based on your data",
    link: "/DietLifeStyleCoach",
  },
];

const Homepage = () => {
  return (
    <div className="relative min-h-screen">
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/6153343/pexels-photo-6153343.jpeg')",
            filter: "brightness(0.7)",
          }}
          aria-hidden="true"
        ></div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">
            AI Medical Assistant
          </h1>
          <h2 className="mb-4 text-xl">Medical Specialist</h2>
          <p className="mb-8 max-w-2xl text-md text-gray-300">
            Providing expert cardiac care with over 15 years of experience in
            interventional cardiology and heart disease prevention.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="rounded-lg bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700">
              Explore
            </button>
            <button className="rounded-lg border-2 border-white bg-transparent px-6 py-3 font-bold text-white transition hover:bg-white/20">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
             Medical Services
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((service, idx) => (
              <Link
                to={service.link}
                key={idx}
                className="overflow-hidden rounded-lg bg-white shadow-lg p-6 text-center transition-transform transform hover:shadow-2xl focus:outline-none"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-20 h-20 object-cover rounded-full shadow-md border-2 border-emerald-100"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-green-700">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
