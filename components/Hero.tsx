import Image from "next/image";
import React from "react";
import hero from "@/public/Big.svg";
import hero2 from "@/public/Big2.svg";
import fb from "@/public/facebook.svg";
import link from "@/public/Vector.svg";
import yt from "@/public/youtube.svg";
import call from "@/public/call.svg";
import Link from "next/link";
import logo from "../public/png/logo-no-background.png";

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

      <main className="flex flex-col max-sm:flex-col-reverse sm:flex-col-reverse lg:flex-row  py-12">
        <div className="w-full md:w-1/2  pr-10">
          <h1 className="text-5xl font-bold mb-4 px-5">
            Chase Your Dream with us
          </h1>
          <p className="text-gray-600 mb-8 px-5">
            The harder you work for something, the greater you'll feel when you
            achieve it.
          </p>
          <div className="flex space-x-4 px-5 mb-8">
            <Link href="/sign-in">
              <button className="md:px-6 px-4 text-sm py-4 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600">
                APPLY ONLINE
              </button>
            </Link>

            <Link href="/sign-up/banks">
              <button className="md:px-6 px-3 py-3 border border-pink-500 text-pink-500 font-bold rounded-full hover:bg-pink-50">
                GET STARTED
              </button>
            </Link>
          </div>
          <div className="flex px-5 items-center space-x-4">
            <span className="text-gray-600 inline-flex gap-x-2">
              <Image src={call} alt="call" />
              16519
            </span>
            <div className="flex space-x-5">
              <Image src={fb} alt="call" />
              <Image src={link} alt="call" />
              <Image src={yt} alt="call" />
            </div>
          </div>
        </div>

        <div className=" lg:mt-[-7.5rem] lg:mr-[-8rem]  z-10  max-sm:mt-[-7rem]  md:w-1/2 mt-8 md:mt-0 relative">
          <Image src={hero} alt="Happy family" className="max-md:hidden " />
          <Image
            src={hero2}
            alt="Happy family"
            className="max-sm:block sm:hidden"
          />
        </div>
      </main>
    </div>
  );
};

export default Hero;
