

import ServiceCard from "./ServiceCard";
import { ChatBubbleLeftRightIcon,MagnifyingGlassIcon,DocumentMagnifyingGlassIcon,HeartIcon,NewspaperIcon, CameraIcon
 } from '@heroicons/react/24/solid';


const servicesData=[
    {
        icon: ChatBubbleLeftRightIcon,
        name: "Expert Consultaion",
        para: "Text-based diagnosis using Fine-Tuned Medical LLM",
        link: "/ExpertConsultation"
        
    },
    {
        icon:CameraIcon,
        name:"Visual Diagnosis",
        para:"Image/Audio RAG-Enhanced Assistant",
        link:"/VisualDiagnosis"
    },
    {
        icon:MagnifyingGlassIcon,
        name:"Disease Predictor",
        para:"Medical System gives detected disease",
        link:"/DiseasePredictor"
    },
    {
        icon:DocumentMagnifyingGlassIcon,
        name:"X-ray Analysis",
        para:"Let AI scan and analyze your X-ray Reports",
        link:"/XRayScan"
    },
    {
        icon:NewspaperIcon,
        name:"Lab Report Analysis",
        para:"Get your Medical Tests Analysed by AI",
        link:"/LabReportAnalysis"
    },
    {
        icon:HeartIcon,
        name:"Diet & Lifestyle Coach",
        para:"Personalized Coaching based on your data",
        link:"/DietLifeStyleCoach"
    }
];

function Services(){
    return(
        <section className="my-15" id="services">
            
            <div className="m-5">
                <h2 className="text-5xl mb-8 mt-5">Our <span>Services</span></h2>
            <p className="text-neutral-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem sapiente tempore ipsa nulla vitae ipsum eligendi, maxime totam eum odio recusandae ipsam corrupti</p>
            </div>
            <div className=" bg-gradient-to-br from-blue-900 via-teal-600 to-blue-900 mt-5 p-2 rounded">
                
                <div className="ServicesContainer p-10 gap-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-3">
                    {
                        servicesData.map((service,index)=>(
                            <ServiceCard 
                            key={index} 
                            icon={service.icon} 
                            name={service.name} 
                            para={service.para}
                            link={service.link}/>
                        ))
                    }
                </div>
            </div>
            
        </section>
    );
}
export default Services;