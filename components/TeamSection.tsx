import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Image, { StaticImageData } from "next/image";
import frame1 from "@/public/Frame 1.svg";
import image from "@/public/Any.png"; // Assuming you want to keep this as a placeholder image

interface ProfileCardProps {
  name: string;
  title: string;
  description: string;
  imageUrl: StaticImageData;
}

const ProfileCard: React.FC<any> = ({ name, title, description, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md md:h-[70vh] p-6 flex flex-col items-center">
      <Image
        width={48}
        height={48}
        src={imageUrl || frame1}
        alt={name}
        className="w-32 h-32 rounded-full mb-4"
      />
      <h3 className="text-xl text-blue-950 font-bold mb-1">{name}</h3>
      <p className="text-gray-600 mb-2">{title}</p>
      <p className="text-center text-gray-500 mb-4">{description}</p>
      <div className="flex space-x-4">
        <FaFacebookF className="text-gray-400 hover:text-blue-600 cursor-pointer" />
        <FaTwitter className="text-gray-400 hover:text-blue-400 cursor-pointer" />
        <FaLinkedinIn className="text-gray-400 hover:text-blue-700 cursor-pointer" />
        <FaInstagram className="text-gray-400 hover:text-pink-600 cursor-pointer" />
      </div>
    </div>
  );
};

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: "Dr John Kpikpi",
      title: "Chairman",
      description:
        "An Apostle, Director, and Author, Dr. Kpikpi serves as Chairman to the Board of Citti Credit, bringing vision and insightful direction.",
      imageUrl: image, // Replace with actual image paths
    },
    {
      name: "Mr Samuel Armoo",
      title: "Manager",
      description:
        "An experienced accountant, skilled in management, Mr. Samuel Armoo is the able manager of Citti Credit.",
      imageUrl: image, // Replace with actual image paths
    },
    {
      name: "Mr Alexander De-Sowah",
      title: "Vice Chairman",
      description:
        "An investment banker with a passion for business growth, Mr. Alexander De-Sowah serves as vice-chairman providing day-to-day oversight.",
      imageUrl: image, // Replace with actual image paths
    },
    {
      name: "Mr David Attah",
      title: "Marketing/Loans Head",
      description:
        "With over 30 years experience  in insurance sales and marketing, Mr Attah serves as both the marketing strategist and loan committee head for Citti Credit.",
      imageUrl: image,
    },
  ];

  return (
    <section className="bg-pink-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-4xl text-blue-950 font-bold mb-2"
            data-aos="fade-left"
          >
            Meet The Board
          </h2>
          <div className="w-16 h-1 bg-blue-900 mx-auto"></div>
        </div>
        <div
          className="flex overflow-x-auto space-x-4 snap-x snap-mandatory  scrollbar-hide"
          data-aos="fade-right"
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full  md:w-1/2 lg:w-1/3 snap-center"
            >
              <ProfileCard {...member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
