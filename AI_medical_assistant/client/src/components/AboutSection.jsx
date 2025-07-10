
function AboutSection(){
    return(
        <section className="flex justify-between font-mono overflow-hidden m-5 scroll-mt-32 pt-4" id="about">
            <div className="flex-2">
                <img src="public/website_illust_pic.jpg" className="ml-24 mt-8" />
            </div>
            <div className="flex-1">
                <h2 className="text-5xl mb-8">About <span>Us</span></h2>
                <p className="text-neutral-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti similique repellat saepe, ullam minus obcaecati, eius et sit aut laboriosam, expedita labore quae? Ipsum labore, incidunt ducimus quis soluta error.</p>
                <button className="px-6 py-4 bg-teal-400 rounded-md mt-6 border-2 cursor-pointer">Contact Us</button>
            </div>
        </section>
    );
}
export default AboutSection;