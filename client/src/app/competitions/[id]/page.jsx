import React from "react";
import BlogCoverImg from "@/assets/BlogCoverImg.jpg";
import Image from "next/image";

const page = async ({ params }) => {
  const { id } = await params;
  let competition = {};

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/competition/${id}`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();

    competition = data?.competition || {};
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }

  // console.log(competition);

  return (
    <div className=" pb-[5rem] ">
      <div className=" w-full h-[20rem] md:h-[30rem] relative ">
        <Image
          src={competition?.imageUrl}
          alt="Blog img"
          fill
          className=" w-full h-full object-cover rounded-lg "
        />
      </div>

      <div className=" mt-4 ">
        <p className=" text-gray-500 font-semibold ">{competition?.institute}</p>
        <h4 className=" text-[1.5rem] text-green-500 ">{competition?.title}</h4>
        <p className=" mt-2 text-gray-600 ">{competition?.description}</p>
      </div>

    </div>
  );
};

export default page;
