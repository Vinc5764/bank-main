import Image from "next/image";
import React from "react";
import image from "@/public/Picture.svg";

const Glance: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white  rounded-lg overflow-hidden">
      <div className="w-full inline-flex items-center lg:justify-start justify-center ">
        <Image
          width={48}
          height={48}
          src={image}
          alt="Plant growing from euro coin"
          className="w-[100vh] px-2 pt-2 object-contain"
        />
      </div>
      <div className="w-full md:w-10/12 p-8">
        <h2 className="text-3xl font-bold mb-4">IPDC AT A GLANCE</h2>
        <p className="text-gray-600 mb-6">
          IPDC Finance Limited (previously known as "Industrial Promotion and
          Development Company of Bangladesh Limited") is the first private
          sector financial institution of the country established in 1981 by a
          distinguished group of shareholders namely International Finance
          Corporation (IFC), USA, German Investment and Development Company
          (DEG), Germany, The Aga Khan Fund for Economic Development (AKFED),
          Switzerland, Commonwealth Development Corporation (CDC), UK and the
          Government of Bangladesh
        </p>
        <a href="#" className="text-pink-500 font-semibold hover:underline">
          Read More →
        </a>
      </div>
    </div>
  );
};

export default Glance;
