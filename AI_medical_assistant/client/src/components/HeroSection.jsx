function HeroSection() {
  return (
    <section className="pt-4 flex justify-between font-mono overflow-hidden px-5 relative">
      <div id="home" className="absolute -top-24 h-24 w-full" aria-hidden="true"></div>
      <div className="flex-1">
        <h1 className="text-5xl mt-8 mb-6">
          Welcome to <span>Logo</span>
        </h1>
        <p className="text-neutral-600 pt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptatem adipisci voluptas quidem libero natus? At fuga quia provident doloribus earum facere iure, et perferendis incidunt nostrum libero voluptatibus velit!
        </p>
        <button className="px-6 py-4 bg-teal-400 rounded-md mt-6 border-2 cursor-pointer">
          Get Started
        </button>
      </div>

      <div className="flex-2">
        <img
          src="/website_illust_pic.jpg" className="ml-24 mt-8" alt="Medical Illustration"
        />
      </div>
    </section>
  );
}

export default HeroSection;
