import React, { useState, useEffect } from "react";

const slides = [
  "Get exclusive recipes delivered to your inbox!",
  "Learn cooking tips from top chefs.",
  "Never miss seasonal food specials.",
  "Join a community of food lovers like you!",
];

const NewsletterCarousel = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16">
      <div className="container mx-auto ">
        <div className="bg-base-100 rounded-xl shadow-lg mx-auto p-8 flex flex-col md:flex-row items-center gap-10">
          {/* Left: Sliding Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-primary mb-6">
              📰 Why Subscribe?
            </h2>
            <p
              key={current}
              className="text-xl font-medium text-gray-700 dark:text-gray-300 transition-opacity duration-700 ease-in-out"
            >
              {slides[current]}
            </p>

            {/* Pagination Dots */}
            <div className="flex justify-center md:justify-start mt-6 space-x-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full ${
                    idx === current ? "bg-primary" : "bg-primary/40"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Newsletter Form */}
          <div className="flex-1 w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Subscribe to Our Recipe Newsletter
            </h3>
            <form
              className="flex flex-col sm:flex-row gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
              <button
                type="submit"
                className="btn btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCarousel;
