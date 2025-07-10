
import { useNavigate } from "react-router-dom";
function ServiceCard({icon:Icon,name,para,link}){
    const navigate =useNavigate();
    return(
        <div className="rounded-xl m-5 p-5 bg-white shadow-2xl transition-shadow Service-Card w-72 "
        onClick={() => navigate(link)}>
        <div className="flex items-center gap-3">
            <Icon className="h-20 w-10 ml-2 text-teal-600 mb-3 " />
            <h3 className="text-teal-600 font-bold text-xl pb-3">{name}</h3>
        </div>
        <p className="text-center">{para}</p>
    </div>
    );
}
export default ServiceCard;