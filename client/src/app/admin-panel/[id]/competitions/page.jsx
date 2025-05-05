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

  const [competitions, setCompetitions] = useState([]);
  const [isLoading1, setIsLoading1] = useState(false);

  const fetchCompetitions = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/competition`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setCompetitions(data?.competitions || []);
      } else {
        console.log(data.message || "Failed to fetch competions!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch competitions:", error);
    } finally {
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  // console.log(id);

  return (
    <div className=" p-[2rem] ">
      <div className=" flex justify-between items-center mb-4">
        <h3 className="text-[2rem] font-medium ">All Competition</h3>
        <Link
          href={`/admin-panel/${id}/competitions/add-competition`}
          className=" bg-green-500 flex items-center shadow-inner active:scale-95 transition-all duration-300 ease-out gap-2 text-white py-2 px-7 rounded hover:bg-green-600"
        >
          <IoPersonAddSharp />
          Add New Competition
        </Link>
      </div>
      <div className=" relative min-h-[20rem] mt-[4rem] ">
        {isLoading1 ? (
          <SubPageLoading />
        ) : (
          <div className=" grid grid-cols-3 gap-5 ">
            {competitions &&
              competitions.map((competition, idx) => (
                <div key={idx} className="  ">
                  <Card
                    competition={competition}
                    id={id}
                    fetchCompetitions={fetchCompetitions}
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

const Card = ({ competition, id, fetchCompetitions }) => {
  const deleteCompetitionHandler = async (id) => {
    if (!id) {
      toast.error("Competition id is required");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/competition/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Competition deleted successfully!");
        fetchCompetitions();
      } else {
        toast.error(data.message || "Failed to delete competition!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting competition delete:", error);
    }
  };

  return (
    <div className=" relative overflow-hidden rounded-md shadow-[0px_1px_10px_rgba(0,0,0,0.15)] ">
      <div className=" absolute z-50 top-4 right-4 flex items-center justify-center gap-2 text-[1.4rem]  ">
        <div
          onClick={() => deleteCompetitionHandler(competition?._id)}
          className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
        >
          <MdDeleteOutline />
        </div>
        <Link
          href={`/admin-panel/${id}/competitions/edit-competition/${
            competition?._id || "0"
          }`}
          className="bg-slate-100 p-2 rounded-full shadow-inner cursor-pointer"
        >
          <CiEdit />
        </Link>
      </div>

      <div className=" relative w-full h-[15rem] ">
        <Image
          src={competition.imageUrl}
          fill
          className=" w-full h-full object-cover "
          alt="Competition Img"
        />
      </div>

      <div className=" p-[1rem] ">
        <h3 className=" text-[1.3rem] font-medium ">{competition?.title}</h3>
        <p className=" mt-2 mb-4 text-[#4b4b4b] ">
          {competition?.date &&
            new Date(competition.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </p>
        <p className="  ">{competition?.description}</p>
      </div>

      {/* <p>{competition?.imageUrl}</p> */}
    </div>
  );
};
