"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

const Page = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/course`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();
        setCourses(data?.courses || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses.");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className=" ">
      <Header />
      <div className=" min-h-[100vh] ">
        <div className=" relative w-full h-[10rem] bg-green-800  ">
        <div className=" w-full h-full text-[3rem] font-medium text-[#fff] flex items-center justify-center ">
          Courses
        </div>
      </div>

      <div className=" max-w-[1400px] mx-auto py-[3rem] ">
        <h2 className=" text-[2rem] font-semibold text-center text-green-500  ">
          All Courses
        </h2>

        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-[3rem] ">
          {courses &&
            courses.map((course, idx) => (
              <div key={idx}>
                <Card course={course} />
              </div>
            ))}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;

const Card = ({ course }) => {
  return (
    <div className=" shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-md overflow-hidden h-full ">
      <div className=" flex flex-col justify-between h-full ">
        <div className=" relative w-full md:h-[14rem] h-[17rem]   ">
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
          <h3 className=" text-[1.3rem] font-medium line-clamp-1 ">
            {course?.title}
          </h3>
          <p className=" mt-2 text-[#4b4b4b] line-clamp-2 ">
            {course?.description}
          </p>
        </div>
        <div className=" px-[1rem] pb-[1rem] ">
          <Link
            href={`/courses/${course?._id}`}
            className=" border-b-2 border-green-500 px-1 pb-1 flex items-center gap-2 w-fit font-medium hover:text-green-500 transition-colors duration-300 ease-in-out "
          >
            Enroll Now <GoArrowUpRight className=" text-[1.3rem] " />
          </Link>
        </div>
      </div>
    </div>
  );
};
