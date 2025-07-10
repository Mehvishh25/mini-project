
function ServiceHeader(props){
    return(
        <section className="service-header">
              <h1 className="text-3xl text-center font-semibold mt-8 mb-6 md:text-3xl lg:text-4xl">{props.phrase} <span>{props.spanPhrase}</span></h1>
              <p className="md:text-lg text-center">{props.para}</p>
        </section>
    );
}
export default ServiceHeader;