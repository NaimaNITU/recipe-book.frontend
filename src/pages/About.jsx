import React from "react";
import Navbar from "../components/shared/Navbar";
import CookingImage from "../assets/Cooking-bro.svg";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-100 text-base-content p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <img
              src={CookingImage}
              alt="Cooking Illustration"
              className="w-64 h-auto mx-auto"
            />
          </div>

          <h1 className="text-4xl font-bold mb-4 text-primary text-center">
            🍳 About Recipe Book
          </h1>
          <p className="text-lg mb-6 text-center">
            <strong>Recipe Book</strong> is your digital kitchen companion — a
            place for food enthusiasts to discover, share, and save their
            favorite recipes. Whether you're a seasoned chef or just starting
            your culinary journey, we’ve got something for every taste.
          </p>

          <div className="bg-base-200 rounded-xl p-6 shadow-md mt-8">
            <h2 className="text-2xl font-semibold mb-2 text-secondary">
              📍 Contact Us
            </h2>
            <p>123 Recipe Street</p>
            <p>Foodville, FK 12345</p>
            <p className="mt-2">
              📧{" "}
              <a
                href="mailto:contact@recipebook.com"
                className="link link-hover"
              >
                contact@recipebook.com
              </a>
            </p>
            <p>📞 +1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
