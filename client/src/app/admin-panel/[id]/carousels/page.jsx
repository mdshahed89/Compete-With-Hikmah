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

  const [carousels, setCarousels] = useState([]);
  const [isLoading1, setIsLoading1] = useState(false);

  const fetchCarousels = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/carousel`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setCarousels(data?.carouselItems || []);
      } else {
        console.log(data.message || "Failed to fetch carousel!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch carousel:", error);
    } finally {
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

  // console.log(id);

  return (
    <div className=" p-[2rem] ">
      <div className=" flex justify-between items-center mb-4">
        <h3 className="text-[2rem] font-medium ">All Carousels</h3>
        <Link
          href={`/admin-panel/${id}/carousels/add-carousel`}
          className=" bg-green-500 flex items-center shadow-inner active:scale-95 transition-all duration-300 ease-out gap-2 text-white py-2 px-7 rounded hover:bg-green-600"
        >
          <IoPersonAddSharp />
          Add New Carousel
        </Link>
      </div>
      <div className=" relative min-h-[20rem] mt-[4rem] ">
        {isLoading1 ? (
          <SubPageLoading />
        ) : (
          <div className=" space-y-5 ">
            {carousels &&
              carousels.map((carousel, idx) => (
                <div key={idx} className="  ">
                  <Card
                    carousel={carousel}
                    id={id}
                    fetchCarousels={fetchCarousels}
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

const Card = ({ carousel, id, fetchCarousels }) => {
  
  const deleteCarouselHandler = async (id) => {
    if (!id) {
      toast.error("Carousel id is required");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/carousel/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Carousel deleted successfully!");
        fetchCarousels();
      } else {
        toast.error(data.message || "Failed to delete carousel!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting carousel delete:", error);
    }
  };

  console.log(carousel);
  

  return (
    <div className=" relative overflow-hidden rounded-md border ">
      <div className=" absolute z-50 top-4 right-4 flex items-center justify-center gap-2 text-[1.4rem]  ">
        <div
          onClick={() => deleteCarouselHandler(carousel?._id)}
          className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
        >
          <MdDeleteOutline />
        </div>
        <Link
          href={`/admin-panel/${id}/carousels/edit-carousel/${
            carousel?._id || "0"
          }`}
          className="bg-slate-100 p-2 rounded-full shadow-inner cursor-pointer"
        >
          <CiEdit />
        </Link>
      </div>

      <div className=" relative w-full h-[25rem] ">
        <Image
          src={carousel.imageUrl}
          fill
          className=" w-full h-full object-cover "
          alt="Carousel Img"
        />
      </div>

      <div className=" p-[1rem] ">
        <h3 className=" text-[1.3rem] font-medium ">{carousel?.title}</h3>
        <p className=" mt-2 mb-4 text-[#4b4b4b] ">
          {carousel?.description}
        </p>
      </div>

    </div>
  );
};
