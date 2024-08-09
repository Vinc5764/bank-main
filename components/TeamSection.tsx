import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import frame1 from "@/public/Frame 1.svg";
import Image from "next/image";

interface ProfileCardProps {
  name: string;
  title: string;
  imageUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, title, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      <Image
        width={48}
        height={48}
        src={frame1}
        alt={name}
        className="w-32 h-32 rounded-full mb-4"
      />
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-gray-600 mb-4">{title}</p>
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
      name: "Alextina Ditarson",
      title: "Senior Tax Advisor",
      imageUrl: "/path/to/alextina.jpg",
    },
    {
      name: "Alan Macdonald",
      title: "Senior Tax Advisor",
      imageUrl: "/path/to/alan.jpg",
    },
    {
      name: "William Adams",
      title: "Senior Tax Advisor",
      imageUrl: "/path/to/william.jpg",
    },
    {
      name: "Advisor Ditarson",
      title: "Senior Tax Advisor",
      imageUrl: "/path/to/advisor.jpg",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Meet The Professionals</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <ProfileCard key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
