import React from "react";
import BlogCoverImg from "@/assets/BlogCoverImg.jpg";
import Image from "next/image";

const page = async ({ params }) => {
  const { id } = await params;
  let blog = {};

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blogs/${id}`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();

    blog = data?.blog || {};
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }

  // console.log(blog);

  return (
    <div className=" pb-[5rem] ">
      <div className=" w-full h-[20rem] md:h-[30rem] relative ">
        <Image
          src={blog?.imageUrl}
          alt="Blog img"
          fill
          className=" w-full h-full object-cover rounded-lg "
        />
      </div>

      <div className=" mt-4 ">
        <h4 className=" text-[1.5rem] text-green-500 "><span className=" text-gray-700 font-semibold ">Author</span> {blog?.author}</h4>
        <p>{blog?.category}</p>
        <p>{blog?.content}</p>
      </div>

    </div>
  );
};

export default page;
