import Image from "next/image";
import React from "react";
import Course1 from "@/assets/Course1.webp";
import Course2 from "@/assets/Course2.webp";
import Course3 from "@/assets/Course3.webp";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const Courses = ({courses}) => {


  return (
    <div className=" max-w-[1400px] mx-auto py-[3rem] ">
      <h2 className=" text-[2rem] font-semibold text-center text-green-500  ">
        Recent Courses
      </h2>

      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-7 mt-[3rem] ">
        {courses &&
          courses.map((course, idx) => (
            <div key={idx}>
              <Card course={course} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Courses;

const Card = ({ course }) => {
  return (
    <div className=" shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-md overflow-hidden h-full ">
      <div className=" flex flex-col justify-between h-full ">
        <div className=" relative w-full h-[17rem]   ">
        <Image
          src={course?.imageUrl}
          fill
          alt="course Img"
          className=" w-full h-full object-cover "
        />
      </div>
      <div className=" p-[1rem] ">
        <div className=" font-medium text-gray-500 ">
          <p>{course?.instructor}</p>
          <p>BDT {course?.price}</p>
        </div>
        <h3 className=" text-[1.3rem] font-medium line-clamp-1 ">{course?.title}</h3>
        <p className=" mt-2 text-[#4b4b4b] line-clamp-2 ">{course?.description}</p>
        
      </div>
      <div className=" px-[1rem] pb-[1rem] ">
        <Link
          href={`/`}
          className=" border-b-2 border-green-500 px-1 pb-1 flex items-center gap-2 w-fit font-medium hover:text-green-500 transition-colors duration-300 ease-in-out "
        >
          Enroll Now <GoArrowUpRight className=" text-[1.3rem] " />
        </Link>
      </div>
      </div>
    </div>
  );
};
