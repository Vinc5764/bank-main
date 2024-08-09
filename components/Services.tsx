import Image from "next/image";
import React from "react";
import image1 from "@/public/Image.svg";
import image2 from "@/public/Image2.svg";
import image3 from "@/public/Image3.svg";
import image4 from "@/public/Image4.svg";

interface ServiceProps {
  image: string;
  title: string;
}

const ServiceCard: React.FC<ServiceProps> = ({ image, title }) => (
  <div className="flex flex-col">
    <Image
      width={48}
      height={48}
      src={image}
      alt={title}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
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
    { image: image1, title: "IPDC SAVING SCHEMES" },
    { image: image2, title: "IPDC PERSONAL LOAN" },
    { image: image3, title: "IPDC DEPOSIT SCHEMES" },
    { image: image4, title: "IPDC AUTO LOAN" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-4">Our Products</h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, dapibus
        mattis vel feugiat erat tortor eleifend.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default OurServices;
