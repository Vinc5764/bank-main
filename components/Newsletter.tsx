"use client";
import React, { useState } from "react";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Subscribed with email:", email);
    // Reset the email input after submission
    setEmail("");
  };

  return (
    <div className="bg-[#FCE0EF]/80 py-16">
      <div className="container mx-auto px-4 max-w-xl">
        <h2
          className="text-3xl font-bold text-center mb-4"
          data-aos="fade-left"
        >
          Newsletter
        </h2>
        <p className="text-center text-gray-600 mb-8" data-aos="fade-right">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ac quis
          aliquam arcu lacus.
        </p>
        <form onSubmit={handleSubmit} className="flex" data-aos="zoom-in-up">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            className="bg-pink-500 text-white px-6 py-2 rounded-r-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
