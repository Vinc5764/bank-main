import Image from "next/image";
import React from "react";
import Circle from "@/public/Circle Layer.svg";
import Cube from "@/public/Cube.svg";
import Bag from "@/public/Bag.svg";
import Ungroup from "@/public/Object Ungroup.svg";
import Rocket from "@/public/Rocket.svg";
import Arrows from "@/public/User Arrows.svg";
import Scenery from "@/public/Scenery.svg";

interface ValueProps {
  icon: string;
  title: string;
  description: string;
}

const Value: React.FC<ValueProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center  ">
    <div className="mb-4 self-center">
      <Image
        src={icon}
        alt={title}
        width={12}
        height={12}
        className="w-12 h-12"
      />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm w-1/2  text-gray-600">{description}</p>
  </div>
);

const Customers: React.FC = () => {
  const values = [
    {
      icon: Circle,
      title: "Integrity",
      description:
        "Displaying the highest level of integrity in the way we conduct our business",
    },
    {
      icon: Scenery,
      title: "Demonstrate",
      description: "Demonstrating a strong Will to Win in the market place",
    },
    {
      icon: Ungroup,
      title: "Diversity",
      description: "Promoting Diversity in the work place and community",
    },
    {
      icon: Arrows,
      title: "Teamwork",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A semper senectus et",
    },
    {
      icon: Circle,
      title: "Collaboration",
      description:
        "Displaying the highest level of integrity in the way we conduct our business",
    },
    {
      icon: Rocket,
      title: "Technology",
      description:
        "Harnessing the power of Technology to deliver better customer experience",
    },
    {
      icon: Bag,
      title: "Corporate",
      description:
        "Setting the standard for the best Corporate Citizenship in the communities we work",
    },
    {
      icon: Cube,
      title: "Digital",
      description:
        "Setting the standard for the best Corporate Citizenship in the communities we work",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4" data-aos="fade-left">
        Creating Extraordinary Customer Experience
      </h1>
      <p
        className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        data-aos="fade-right"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum
        eget morbi dignissim eu pharetra consequat montes, sagittis.
      </p>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8"
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
