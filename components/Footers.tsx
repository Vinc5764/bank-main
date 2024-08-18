import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-navy-900 mt-20 text-white bg-blue-950  py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center space-y-10 text-sm">
          <div className="space-y-2  space-x-2">
            <Link href={`/signup`}>
              <button className=" bg-[#A4167A] px-4 py-2 text-white py-2 rounded hover:bg-[#A4167A] transition">
                JOIN US
              </button>
            </Link>
            <Link href={`/sign-in`}>
              <button className="px-4 py-2 text-white font-semibold  border rounded">
                SIGN IN
              </button>
            </Link>
          </div>
          <h1 className="text-4xl  font-bold">CITTI CREDIT UNION</h1>
          <p className="mb-2">
            Ashaley Botwe ,Highway , Ghana, | Phone: +233 257074272 |
            E-mail:mycitticreditonline@gmail.com
          </p>
          {/* <div className="border border-gray-600 inline-block px-4 py-1 mb-2">
            PAID FOR BY FRIENDS OF LINDA RUSSELL
          </div> */}
          <p>Copyright © 2024 Citti Credit Union . All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
