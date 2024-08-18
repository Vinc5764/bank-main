import Image from "next/image";
import React from "react";
import group from "@/public/Group.jpg";
import call from "@/public/call.svg";
import Link from "next/link";
import logo from "../public/png/logo-no-background.png";
import instagram from "@/public/2227.jpg"; // Add Instagram icon import

const Hero: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-8 py-4 bg-white">
        <div className="w-[12rem] z-50 font-bold text-pink-600">
          <Image src={logo} alt="logo" />
        </div>
        <nav className="hidden md:block md:z-40">
          <ul className="flex space-x-6">
            {["RETAIL", "SME", "CORPORATE", "ABOUT US"].map((item) => (
              <li
                key={item}
                className="text-sm font-medium text-gray-600 hover:text-pink-500"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center z-[50] space-x-4">
          <Link href="/sign-up/banks">
            <button className="px-4 py-3 hidden md:block text-sm font-bold text-white bg-pink-500 rounded-full hover:bg-pink-600">
              Register
            </button>
          </Link>
          <Link href="/sign-in">
            <button className="px-4   py-2 border border-pink-500 text-pink-500 font-bold rounded-full hover:bg-pink-50">
              Sign In
            </button>
          </Link>
        </div>
      </header>

      <main className="flex  flex-col max-sm:flex-col sm:flex-col-reverse lg:flex-row py-12">
        <div className="w-full space-y-6 md:w-1/2 pr-10" data-aos="fade-up">
          <h1 className="text-5xl px-5 leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400  to-blue-500">
            WORK. SAVE. PROSPER.
          </h1>
          <p className="text-gray-600 mb-8 px-5">
            We remain committed to supporting all our hardworking business men
            and women with affordable credit lines; and offering attractive
            savings packages to our clients. Let us prosper together!
          </p>
          <div className="flex  space-x-4 px-5 mb-8">
            <Link href="/signup">
              <button className="md:px-6 px-4 w-[150px] h-[50px] text-sm py-4 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600">
                Join Us
              </button>
            </Link>
            <div className="flex px-5 items-center space-x-4">
              <span className="text-gray-600 inline-flex gap-x-2">
                <Image src={call} alt="call" />
                <p>0257074272</p>
              </span>
              <div className="flex w-1/12 space-x-5">
                <Image src={instagram} alt="Instagram" />{" "}
                {/* Add Instagram link */}
              </div>
            </div>
          </div>
        </div>

        <div
          className="lg:mt-[-7.5rem] lg:mr-[-8rem] z-10 md:w-1/2 mt-8 md:mt-0 relative"
          data-aos="fade-up"
        >
          <Image src={group} alt="Happy family" className="" />
        </div>
      </main>
    </div>
  );
};

export default Hero;
