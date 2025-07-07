import Link from "next/link";
import React from "react";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";

const Footer = () => {
  return (
    <div className=" mt-[2rem] py-[3rem] bg-green-600 ">
      <div className=" flex items-center gap-5 justify-center text-[#fff] text-[1.5rem] ">
        <FaFacebookSquare />
        <FaInstagram />
        <IoLogoLinkedin />
      </div>

      <nav className=" text-[1.1rem] flex items-center justify-center gap-2 md:gap-4 text-[#fff] my-[1rem] md:text-base text-sm  ">
        <Link
          href="/"
          className=" relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#ffffff] before:transition-[width] duration-300 ease-in-out "
        >
          Home
        </Link>
        <Link
          href="/competitions"
          className=" relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#ffffff] before:transition-[width] duration-300 ease-in-out "
        >
          Competitions
        </Link>
        <Link
          href="/blogs"
          className=" relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#ffffff] before:transition-[width] duration-300 ease-in-out"
        >
          Blogs
        </Link>
        <Link
          href="/courses"
          className=" relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#ffffff] before:transition-[width] duration-300 ease-in-out"
        >
          Courses
        </Link>
        <Link
          href="/"
          className=" relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#ffffff] before:transition-[width] duration-300 ease-in-out "
        >
          About Us
        </Link>
        {/* <div
                    onClick={() => setOpen(true)}
                    className=" text-3xl cursor-pointer"
                  >
                    <HiBars3BottomRight />
                  </div> */}
      </nav>

            <p className=" text-center text-[#fff]  ">@2025 Hikmah Solutions  | All rights reserved</p>

    </div>
  );
};

export default Footer;
