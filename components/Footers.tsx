import Image from "next/image";
import React from "react";
import fb from "@/public/facebook.svg";
import link from "@/public/Vector.svg";
import yt from "@/public/youtube.svg";
import call from "@/public/call.svg";

interface FooterColumnProps {
  title: string;
  links: string[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div className="mb-8 md:mb-0">
    <h3 className="font-bold text-lg mb-4">{title}</h3>
    <ul>
      {links.map((link, index) => (
        <li key={index} className="mb-2">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footers: React.FC = () => {
  const footerData = [
    {
      title: "About the company",
      links: [
        "Learn To Love Growth",
        "And Change And You Will",
        "Be A Success. Microsoft",
        "Patch",
      ],
    },
    {
      title: "Products",
      links: [
        "CSR Activities",
        "Green Banking",
        "News",
        "Ongoing Campaign",
        "Updates",
      ],
    },
    {
      title: "Get Started",
      links: [
        "Career",
        "Contact Us",
        "Government Securities",
        "Examples",
        "NIS",
      ],
    },
    {
      title: "About",
      links: [
        "IPDC at a Glance",
        "Mission, Vision & Values",
        "Corporate Governanace",
        "Shareholders",
        "Investor Relations",
      ],
    },
  ];

  return (
    <footer className="bg-white py-12">
      <div className="flex flex-col lg:flex-row items-center justify-around lg: mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerData.map((column, index) => (
            <FooterColumn key={index} {...column} />
          ))}
        </div>
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-300">
          <div className="flex px-5 items-center space-x-4">
            <span className="text-pink-500 font-bold inline-flex gap-x-2">
              <Image src={call} alt="call" /> 16519
            </span>
            <div className="flex space-x-2">
              <Image src={fb} alt="call" />
              <Image src={link} alt="call" />
              <Image src={yt} alt="call" />
            </div>
          </div>
          <div className="text-pink-500 font-bold">
            <i className="fas fa-phone-alt mr-2"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
