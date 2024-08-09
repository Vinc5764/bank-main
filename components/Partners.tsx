import Image from "next/image";
import React from "react";
import frame1 from "@/public/Frame 1.svg";
import frame2 from "@/public/Frame 13.svg";
import frame3 from "@/public/Frame 14.svg";
import frame4 from "@/public/Frame 15.svg";

interface PartnerProps {
  logo: string;
  name: string;
}

const Partner: React.FC<PartnerProps> = ({ logo, name }) => (
  <div className="flex items-center justify-center p-4">
    <Image src={logo} width={72} height={72} alt={name} className="w-[10rem]  max-md:w-20" />
  </div>
);

const Partners: React.FC = () => {
  const partners = [
    { logo: frame1, name: "Westin Hotels & Resorts" },
    { logo: frame2, name: "Summit" },
    { logo: frame3, name: "Holcim" },
    { logo: frame4, name: "BTV" },
  ];

  return (
    <div className="bg-[#FCE0EF]/80 h-[50vh] py-12">
      <h2 className="text-2xl font-bold text-center mb-8">BUSINESS PARTNERS</h2>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          {partners.map((partner, index) => (
            <Partner key={index} {...partner} />
          ))}
        </div>
      </div>
      {/* <div className="flex justify-center mt-8">
        <span className="h-2 w-2 rounded-full bg-pink-500 mx-1"></span>
        <span className="h-2 w-2 rounded-full bg-gray-300 mx-1"></span>
        <span className="h-2 w-2 rounded-full bg-gray-300 mx-1"></span>
        <span className="h-2 w-2 rounded-full bg-gray-300 mx-1"></span>
      </div> */}
    </div>
  );
};

export default Partners;
