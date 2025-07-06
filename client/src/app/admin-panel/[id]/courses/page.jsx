"use client";

import { UserTable } from "@/components/Tables";
import React, { useEffect, useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { SubPageLoading } from "@/components/PageLoading";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Image from "next/image";

const Page = ({ params }) => {
  const { id } = React.use(params);

  const [courses, setCourses] = useState([]);
  const [isLoading1, setIsLoading1] = useState(false);

  const fetchCourses = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/course`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setCourses(data?.courses || []);
      } else {
        console.log(data.message || "Failed to fetch blogs!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch blogs:", error);
    } finally {
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // console.log(id);

  return (
    <div className=" p-[2rem] ">
      <div className=" flex justify-between items-center mb-4">
        <h3 className="text-[2rem] font-medium ">All Courses</h3>
        <Link
          href={`/admin-panel/${id}/courses/add-course`}
          className=" bg-green-500 flex items-center shadow-inner active:scale-95 transition-all duration-300 ease-out gap-2 text-white py-2 px-7 rounded hover:bg-green-600"
        >
          <IoPersonAddSharp />
          Add New Course
        </Link>
      </div>
      <div className=" relative min-h-[20rem] mt-[4rem] ">
        {isLoading1 ? (
          <SubPageLoading />
        ) : (
          <div className=" grid grid-cols-3 gap-5 ">
            {courses &&
              courses.map((course, idx) => (
                <div key={idx} className="  ">
                  <Card
                    course={course}
                    id={id}
                    fetchCourses={fetchCourses}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
// shadow-[0px_1px_10px_rgba(0,0,0,0.15)]

const Card = ({ course, id, fetchCourses }) => {
  
  const deleteCourseHandler = async (id) => {
    if (!id) {
      toast.error("Course id is required");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/course/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Course deleted successfully!");
        fetchCourses();
      } else {
        toast.error(data.message || "Failed to delete Course!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting Course delete:", error);
    }
  };

  return (
    <div className=" relative overflow-hidden rounded-md shadow-[0px_1px_10px_rgba(0,0,0,0.15)] h-full ">
      <div className=" absolute z-50 top-4 right-4 flex items-center justify-center gap-2 text-[1.4rem]  ">
        <div
          onClick={() => deleteCourseHandler(course?._id)}
          className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
        >
          <MdDeleteOutline />
        </div>
        <Link
          href={`/admin-panel/${id}/courses/edit-course/${
            course?._id || "0"
          }`}
          className="bg-slate-100 p-2 rounded-full shadow-inner cursor-pointer"
        >
          <CiEdit />
        </Link>
      </div>

      <div className=" relative w-full h-[15rem] ">
        <Image
          src={course.imageUrl}
          fill
          className=" w-full h-full object-cover "
          alt="Blog Img"
        />
      </div>

      <div className=" p-[1rem] ">
        <p className=" font-semibold text-gray-500 ">{course?.instructor}</p>
        <p className=" font-semibold text-gray-500 ">BDT {course?.price}</p>
        <h3 className=" text-[1.3rem] font-medium line-clamp-1 ">{course?.title}</h3>
        <p className=" mt-2 text-[#4b4b4b] line-clamp-2 ">
          {course?.description}
        </p>
      </div>

    </div>
  );
};
