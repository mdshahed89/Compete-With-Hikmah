import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  let blogs = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blogs`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();

    blogs = data?.blogs || [];
  } catch (error) {
    console.error("Error fetching carousel data:", error);
  }

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

        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-7 mt-[3rem] ">
          {blogs &&
            blogs.map((blog, idx) => (
              <div key={idx}>
                <Card blog={blog} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;

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
