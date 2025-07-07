import React from "react";
import BlogCoverImg from "@/assets/BlogCoverImg.jpg";
import Image from "next/image";

const page = async ({ params }) => {
  const { id } = await params;
  let course = {};

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/course/${id}`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();

    course = data?.course || {};
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }

  // console.log(course);

  return (
    <div className=" pb-[5rem] ">
      <div className=" w-full h-[20rem] md:h-[30rem] relative ">
        <Image
          src={course?.imageUrl}
          alt="Blog img"
          fill
          className=" w-full h-full object-cover rounded-lg "
        />
      </div>

      <div className=" mt-[1rem] ">
        <div className=" font-medium text-gray-500 ">
          <p>{course?.instructor}</p>
          <p>BDT {course?.price}</p>
        </div>
        <h3 className=" text-[1.3rem] font-medium ">{course?.title}</h3>
        <p className=" mt-2 text-[#4b4b4b] ">{course?.description}</p>
        
      </div>

    </div>
  );
};

export default page;
