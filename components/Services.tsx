import Image from "next/image";
import React from "react";
import image1 from "@/public/Image.svg";
import image2 from "@/public/Image2.svg";
import image3 from "@/public/Image3.svg";

interface ServiceProps {
  image: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceProps> = ({ image, title, description }) => (
  <div className="flex flex-col">
    <Image
      width={48}
      height={48}
      src={image}
      alt={title}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h3 className="text-lg text-blue-950 font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <a
      href="#"
      className="text-pink-500 font-semibold hover:underline flex items-center"
    >
      Learn more
      <svg
        className="w-4 h-4 ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  </div>
);

const OurServices: React.FC = () => {
  const services = [
    {
      image: image1,
      title: "CITTI SAVINGS",
      description:
        "Save with us, for a secure savings experience and enjoy an interest rate of 6% per annum.",
    },
    {
      image: image2,
      title: "CITTI SHARES",
      description:
        "Our share account entitles members to dividends. Minimum shares are currently available at GHC 500.00.",
    },
    {
      image: image3,
      title: "CITTI LOANS",
      description:
        "Available to qualified members following vetting by the loan committee, at a rate of 12% per annum. We prioritize business loans, fostering prosperity.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl text-blue-950 font-bold text-center mb-4" data-aos="fade-left">
        Our Products
      </h2>
      <p
        className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        data-aos="fade-right"
      >
        Discover our range of products designed to help you achieve financial
        security and prosperity.
      </p>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-aos="zoom-in-up"
      >
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default OurServices;
