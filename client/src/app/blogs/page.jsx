"use client";

import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blogs`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();
        setBlogs(data?.blogs || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs.");
      }
    };

    fetchBlogs();
  }, []);

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
      blog.category?.toLowerCase() === selectedType.toLowerCase();

    return titleMatch && typeMatch;
  });

  return (
    <div className=" ">
      <Header />
      <div className=" relative w-full h-[30rem] bg-green-800  ">
        <div className=" w-full h-full text-[3rem] font-medium text-[#fff] flex items-center justify-center ">
          Blogs
        </div>
      </div>
      <div className=" max-w-[1400px] mx-auto py-[3rem] px-2 ">
        <h2 className=" text-[2rem] font-semibold text-center text-green-500  ">
          All Blogs
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
      </div>
    </div>
  );
};

export default Page;

const Card = ({ blog }) => {
  return (
    <Link
      href={`/blogs/${blog?._id}`}
      className=" block shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-md overflow-hidden "
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
        <h3 className=" text-[1.3rem] font-medium ">{blog?.title}</h3>
        <p className=" mt-2 mb-4 text-[#4b4b4b] ">{blog?.content}</p>
      </div>
    </Link>
  );
};
