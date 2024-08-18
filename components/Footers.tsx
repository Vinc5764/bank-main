import Image from "next/image";
import React from "react";
import call from "@/public/call.svg";
import ig from "@/public/2227.jpg"; // Assuming you have an Instagram icon

const Footers: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center h-full">
      <span className="text-pink-500 inline-flex p-8 font-bold mb-4">
        <Image src={call} alt="call" className="w-12 h-10 mt-3" />
        <p className="mt-5">0257074272 </p>
      </span>
      <div>
        <Image src={ig} alt="Instagram" className="w-12 h-12" />
      </div>
    </div>
  );
};

export default Footers;
