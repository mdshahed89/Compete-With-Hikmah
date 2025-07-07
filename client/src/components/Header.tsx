"use client";

import React, { useEffect, useState } from "react";
// import Logo from "@/assets/LogoWhite.png";
import Link from "next/link";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { usePathname } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={` ${
        scrolled ? "bg-[#fff]" : "bg-[#fff]"
      } transition-colors duration-300 ease-in-out w-full text-[#000] z-[1000] `}
    >
      <div className="max-w-[1400px] mx-auto px-2 h-[80px] flex items-center justify-between  ">
        <div className="">
          {/* <Image src={Logo} alt="Logo" className=" w-[7rem] object-contain " /> */}
          <Link
            href={`/`}
            className=" text-[2rem] font-medium tracking-widest  "
          >
            CWH
          </Link>
        </div>

        <nav className="hidden md:flex gap-10 text-[1.2rem] items-center ">
          <Link
            href="/"
            className={` ${pathname === "/" && "before:w-full text-green-500"} hover:text-green-500 relative before:absolute before:left-0 before:-bottom-2 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#00AB0C] before:transition-[width] duration-300 ease-in-out `}
          >
            Home
          </Link>
          <Link
            href="/competitions"
            className={` ${pathname === "/competitions" && "before:w-full text-green-500"} hover:text-green-500 relative before:absolute before:left-0 before:-bottom-2 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#00AB0C] before:transition-[width] duration-300 ease-in-out `}
          >
            Competitions
          </Link>
          <Link
            href="/blogs"
            className={` ${pathname === "/blogs" && "before:w-full text-green-500"} hover:text-green-500 relative before:absolute before:left-0 before:-bottom-2 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#00AB0C] before:transition-[width] duration-300 ease-in-out `}
          >
            Blogs
          </Link>
          <Link
            href="/courses"
            className={` ${pathname === "/courses" && "before:w-full text-green-500"} hover:text-green-500 relative before:absolute before:left-0 before:-bottom-2 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#00AB0C] before:transition-[width] duration-300 ease-in-out `}
          >
            Courses
          </Link>
          <Link
            href="#"
            className={` ${pathname === "/about-us" && "before:w-full text-green-500"} hover:text-green-500 relative before:absolute before:left-0 before:-bottom-2 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#00AB0C] before:transition-[width] duration-300 ease-in-out `}
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

        <div
          onClick={() => setOpen(true)}
          className=" text-3xl md:hidden flex cursor-pointer"
        >
          <HiBars3BottomRight />
        </div>

        <div
          className={`fixed inset-0 z-[60] flex transition-all duration-300 ease-in-out ${
            open ? "visible" : "invisible"
          }`}
        >
          <div
            className={`flex-1 bg-black transition-opacity duration-300 ${
              open ? "opacity-50" : "opacity-0"
            }`}
            onClick={() => setOpen(false)}
          />

          <div
            className={`w-full px-[1rem] pt-[1rem] bg-white shadow-lg h-full transform transition-transform duration-300 ease-in-out ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between">
              <Link
            href={`/`}
            className=" text-[2rem] font-medium tracking-widest "
          >
            CWH
          </Link>
              <button
                onClick={() => setOpen(false)}
                className=" bg-[#000] p-2 rounded-sm "
              >
                <RxCross1 className="text-[#fff] text-[1.2rem] " />
              </button>
            </div>

            <nav className="flex flex-col text-[#131313] md:hidden font-semibold gap-5 mt-16 text-[1.5rem] ">
              <Link
                onClick={() => setOpen(false)}
                href="/"
                className=" relative before:absolute before:left-0 before:-bottom-2 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#00AB0C] before:transition-[width] duration-300 ease-in-out "
              >
                Home
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/competitions"
                className=" relative before:absolute before:left-0 before:-bottom-2 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#00AB0C] before:transition-[width] duration-300 ease-in-out "
              >
                Competitions
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="blogs"
                className=" relative before:absolute before:left-0 before:-bottom-2 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#00AB0C] before:transition-[width] duration-300 ease-in-out"
              >
                Blogs
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/courses"
                className=" relative before:absolute before:left-0 before:-bottom-2 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#00AB0C] before:transition-[width] duration-300 ease-in-out"
              >
                Courses
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/"
                className=" relative before:absolute before:left-0 before:-bottom-2 before:h-[2px] before:w-0 hover:before:w-full before:bg-[#00AB0C] before:transition-[width] duration-300 ease-in-out "
              >
                About Us
              </Link>
            </nav>

            <div className=" md:block hidden ">
              <div className="  py-4 text-black text-center ">
                <h2 className="text-[1.6rem] font-semibold mb-4">Logo</h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Rerum natus sunt dignissimos. Voluptatibus non error explicabo
                  maxime! Ut, sint provident.
                </p>
              </div>
              <div className=" text-black flex items-center gap-2 justify-center mt-6 ">
                <div className=" bg-blue-600 p-2 rounded-full text-[#fff] text-[1.2rem] cursor-pointer ">
                  <FaFacebookF />
                </div>
                <div className=" bg-green-500 p-2 rounded-full text-[#fff] text-[1.2rem] cursor-pointer ">
                  <FaWhatsapp />
                </div>
                <div className=" bg-blue-700 p-2 rounded-full text-[#fff] text-[1.2rem] cursor-pointer ">
                  <FaLinkedinIn />
                </div>
                <div className=" bg-gradient-to-br from-pink-500 to-yellow-500 p-2 rounded-full text-[#fff] text-[1.2rem] cursor-pointer ">
                  <IoLogoInstagram />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
