import Image from "next/image";
import React from "react";
import frame1 from "@/public/Frame 1.svg";
import frame2 from "@/public/Frame 13.svg";
import frame3 from "@/public/Frame 14.svg";
import frame4 from "@/public/Frame 15.svg";
import cuaLogo from "@/public/cuua.jpg"; // Assuming you have the CUA logo

interface PartnerProps {
  logo: any;
  name: string;
}

const Partner: React.FC<PartnerProps> = ({ logo, name }: any) => (
  <div className=" p-4">
    <Image src={logo} alt={name} className=" w-[400px]" />
  </div>
);

const Partners: React.FC = () => {
  const partners = [
    { logo: cuaLogo, name: "CUA" }, // Added CUA as the regulator
  ];

  return (
    <div className=" flex items-center justify-center">
      {" "}
      <div className="  bg-slate-100 md:flex items-center gap-8 justify-center px-10  py-12">
        <h2
          className="text-4xl text-blue-950 font-bold text-center mb-8"
          data-aos="fade-left"
        >
          OUR <br /> REGULATOR
        </h2>
        <div className="container-none mx-auto">
          <div className="" data-aos="fade-up">
            {partners.map((partner, index) => (
              <Partner key={index} logo={partner.logo} name={partner.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
