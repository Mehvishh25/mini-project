//this written so that the navigation back to home screen is correct and clean 
function HomePage() {
  return (
    <main>
      <HeroSection />
      <hr className="text-teal-600 mt-15" />
      <ServicesSection />
      <AboutSection />
    </main>
  );
}

export default HomePage;
