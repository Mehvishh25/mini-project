import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import LoginPage from './pages/LoginPage'; 
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import XRayScan from './pages/XRayScan';
import MedLLM from './pages/MedLLM';
import SymptomChecker from './pages/SymptomChecker';
import DietCoach from './pages/DietCoach';
import LabReport from './pages/LabReport';
import ChatWithDoctor from './pages/ChatWithDoctor';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';



function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Scroll to top if no hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}

function App() {
  
  return (
    <>
      
        <NavBar/>
        <ScrollToHashElement />
        <Routes>
        <Route path="/"
          element={
            <>
              <main>
                <HeroSection />
              </main>
            </>
          }
        />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/ExpertConsultation" element={<MedLLM />} />
        <Route path="/DiseasePredictor" element={<SymptomChecker />} />
        <Route path="/VisualDiagnosis" element={<ChatWithDoctor />} />
        <Route path="/XRayScan" element={<XRayScan />} />
        <Route path="/LabReportAnalysis" element={<LabReport />} />
        <Route path="/DietLifeStyleCoach" element={<DietCoach />} />
        <Route path="/Profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>
        </Routes>
        <Footer/>
      
      
    </>
  )

}

export default App
