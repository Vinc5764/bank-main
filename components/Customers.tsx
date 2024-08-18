import Image from "next/image";
import React from "react";
import Circle from "@/public/Circle Layer.svg";
import Arrows from "@/public/User Arrows.svg"; // Assuming the icons are being reused
import Bag from "@/public/Bag.svg";

interface ValueProps {
  icon: string;
  title: string;
  description: string;
}

const Value: React.FC<ValueProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center">
    <div className="mb-4 self-center">
      <Image
        src={icon}
        alt={title}
        width={12}
        height={12}
        className="w-12 h-12"
      />
    </div>
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-center   text-gray-600">{description}</p>
  </div>
);

const Customers: React.FC = () => {
  const values = [
    {
      icon: Circle,
      title: "Integrity",
      description:
        "We believe in the power of a life of integrity to lead ourselves and our customers into wealth and prosperity.",
    },
    {
      icon: Arrows,
      title: "Prudence",
      description:
        "We believe that wise savings and investments will contribute to a brighter tomorrow.",
    },
    {
      icon: Bag,
      title: "Fostering Prosperity",
      description:
        "We are committed to providing affordable credit to release our members into greater levels of financial freedom.",
    },
  ];

  return (
    <div className="container mx-auto space-y-10 px-4 py-20">
      <h1 className="text-4xl text-blue-950 font-bold text-center mb-4" data-aos="fade-left">
        Our Values
      </h1>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-aos="zoom-in-up"
      >
        {values.map((value, index) => (
          <Value key={index} {...value} />
        ))}
      </div>
    </div>
  );
};

export default Customers;
