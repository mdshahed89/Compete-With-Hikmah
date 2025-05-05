import Image from "next/image";
import React from "react";
import HeroImg from "@/assets/HeroImg.webp";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const Blogs = ({ blogs }) => {
  return (
    <div className=" max-w-[1400px] mx-auto py-[3rem] ">
      <h2 className=" text-[2rem] font-semibold text-center text-green-500  ">
        Recent Blogs
      </h2>

      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-7 mt-[3rem] ">
        {blogs &&
          blogs.slice(0, 3).map((blog, idx) => (
            <div key={idx}>
              <Card blog={blog} />
            </div>
          ))}
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
