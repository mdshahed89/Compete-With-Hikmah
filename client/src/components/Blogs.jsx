"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import HeroImg from "@/assets/HeroImg.webp";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const Blogs = ({ blogs }) => {
  const searchRef = useRef();
  const typeRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Type");
  const [typeOpen, setTypeOpen] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const titleMatch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const typeMatch =
      selectedType.toLowerCase() === "all type" ||
      blog.category?.toLowerCase() === selectedType.toLowerCase(); // category field assumed

    return titleMatch && typeMatch;
  });

  return (
    <div className=" max-w-[1400px] mx-auto py-[3rem] px-3 ">
      <h2 className=" text-[2rem] font-semibold text-center text-green-500  ">
        Recent Blogs
      </h2>

      <div className=" mt-[4rem] flex items-center gap-3 justify-between flex-wrap">
        <div className="relative w-full max-w-[35rem]" ref={searchRef}>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-lg outline-none "
            placeholder="Search by title "
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="relative w-full sm:w-[10rem]" ref={typeRef}>
          <div
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center bg-white cursor-pointer"
            onClick={() => setTypeOpen(!typeOpen)}
          >
            {selectedType}
          </div>
          {typeOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-[15rem] overflow-y-auto">
              {[
                "All Type",
                "Hackathon",
                "Project Showcase",
                "Poster Presentation",
                "Robo Soccer",
                "Drone Race",
                "Debate",
                "Case Study",
                "Techathon",
                "Programming Contest",
              ].map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedType(option);
                    setTypeOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-7 mt-[3rem] ">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.slice(0, 3).map((blog, idx) => (
            <div key={idx}>
              <Card blog={blog} />
            </div>
          ))
        ) : (
          <div className=" col-span-full text-center text-gray-500 font-medium text-[1.1rem] py-[2rem]">
            No blogs found.
          </div>
        )}
      </div>
      <div className=" mt-[2rem] flex justify-end ">
        <Link
          href={`/blogs`}
          className=" border-b-2 border-green-500 px-1 pb-1 flex items-center gap-2 w-fit font-medium hover:text-green-500 transition-colors duration-300 ease-in-out "
        >
          Explore More <GoArrowUpRight className=" text-[1.3rem] " />
        </Link>
      </div>
    </div>
  );
};

export default Blogs;

const Card = ({ blog }) => {
  // console.log(blog);

  return (
    <Link
      href={`/blogs/${blog?._id}`}
      className=" block shadow-[0px_1px_10px_rgba(0,0,0,0.15)] h-full rounded-md overflow-hidden "
    >
      <div className=" relative w-full h-[17rem]   ">
        <Image
          src={blog?.imageUrl}
          fill
          alt="Competition Img"
          className=" w-full h-full object-cover "
        />
      </div>
      <div className=" p-[1rem] ">
        <h3 className=" text-[1.3rem] font-medium line-clamp-1 ">
          {blog?.title}
        </h3>
        <p className=" mt-2 mb-4 text-[#4b4b4b] line-clamp-2 ">
          {blog?.content}
        </p>
      </div>
    </Link>
  );
};
