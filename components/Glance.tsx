import Image from "next/image";
import React from "react";
import image from "@/public/Picture.svg";

const Glance: React.FC = () => {
  return (
    <div className="flex mt-[5%] flex-col md:flex-row items-center bg-white rounded-lg overflow-hidden">
      <div
        className="w-full inline-flex items-center lg:justify-start justify-center"
        data-aos="fade-right"
      >
        <Image
          width={48}
          height={48}
          src={image}
          alt="Plant growing from euro coin"
          className="w-[100vh] px-2 pt-2 object-contain"
        />
      </div>
      <div className="w-full md:w-10/12 p-8" data-aos="fade-left">
        <h2 className="text-3xl text-blue-950 font-bold mb-4">CITTI CREDIT AT A GLANCE</h2>
        <p className="text-gray-600 mb-6">
          Serving close to 1000 members, Citti Credit is a vibrant financial hub
          in the Adenta municipality. Amongst our most patronized products are
          Citti Savings and Citti Shares, as well as our loans given at an
          interest rate of 12% per annum. Our Head Office is located at the
          office area of the City of God Church Center, at Ashaley Botwe,
          Highways. Our opening hours are 8.00 am-5.00 pm from Tuesday to
          Friday. We look forward to welcoming and serving you.
        </p>
        {/* Removed the "Read More" link */}
      </div>
    </div>
  );
};

export default Glance;
