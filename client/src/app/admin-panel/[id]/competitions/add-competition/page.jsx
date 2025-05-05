"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";
import { ButtonLoading, FetchLoading } from "@/components/PageLoading";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { SlCloudUpload } from "react-icons/sl";
import { uploadFile } from "@/components/imageUpload";

const Page = ({ params }) => {
  const { id } = React.use(params);
  const [competitionInfo, setCompetitionInfo] = useState({
    title: "",
    date: "",
    type: "",
    region: "",
    institute: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setCompetitionInfo({ ...competitionInfo, [name]: value });
  };

  const addCompetitionHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/competition`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(competitionInfo),
        }
      );

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        toast.success("Competition added successfully!");
        setCompetitionInfo({
          title: "",
          date: "",
          type: "",
          region: "",
          institute: "",
          description: "",
          imageUrl: "",
        });
      } else {
        toast.error(data.message || "Failed to add competition!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting competition:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    const maxSize = 5 * 1024 * 1024;

    if (selectedFile) {
      if (selectedFile.size <= maxSize) {
        setErrors((prev) => ({ ...prev, file: null }));
        setLoading(true);

        try {
          const uploadedUrl = await uploadFile(selectedFile);
          if (uploadedUrl) {
            setCompetitionInfo({
              ...competitionInfo,
              imageUrl: uploadedUrl,
            });
          } else {
            setErrors((prev) => ({
              ...prev,
              file: "Failed to upload file to Cloudinary.",
            }));
          }
        } catch (error) {
          console.error("Upload error:", error);
          setErrors((prev) => ({
            ...prev,
            file: "An error occurred while uploading the file.",
          }));
        } finally {
          setLoading(false);
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          file: "File size must be less than 5 MB.",
        }));
        // setFilePreview(null);
        // setFile(null);
      }
    }
  };

  const handleClearFile = () => {
    setErrors((prev) => ({ ...prev, file: null }));
    setCompetitionInfo({
      ...competitionInfo,
      imageUrl: "",
    });
  };

  // console.log(competitionInfo);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[800px] mx-auto md:mt-8 px-3 md:px-8 py-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl"
    >
      <div className="flex items-center space-x-2 mb-10 justify-between">
        <h2 className="text-3xl font-semibold text-gray-800">
          Add Competition
        </h2>
        <Link
          href={`/admin-panel/${id}/competitions`}
          className=" p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] "
        >
          <IoArrowBackSharp />
        </Link>
      </div>

      <form onSubmit={addCompetitionHandler} className="space-y-3">
        <div className="w-full max-w-[25rem] ">
          <label className="block text-gray-600 font-medium mb-1">
            Cover Image
          </label>

          <div className="flex h-[20rem] border-2 rounded-md border-[#17DB4F]">
            {competitionInfo.imageUrl ? (
              <div className=" relative w-full ">
                <div className=" absolute flex justify-end z-50 bg-black/50 text-[#fff] p-2 right-3 top-3 rounded-full ">
                  <button type="button" onClick={handleClearFile}>
                    <RxCross2 className="text-2xl" />
                  </button>
                </div>
                <div className="relative w-full h-full rounded-lg p-2">
                  <Image
                    loading="lazy"
                    placeholder="blur"
                    src={competitionInfo.imageUrl}
                    alt={"Cover Img"}
                    fill
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmMGZkZjQiLz48L3N2Zz4="
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div
                onClick={() => document.getElementById("CoverImgClick").click()}
                className=" relative w-full flex flex-col items-center justify-center gap-4 cursor-pointer "
              >
                {loading && <FetchLoading />}
                <button
                  type="button"
                  className="text-black transition-all duration-300 ease-in-out active:scale-95 text-[2rem] py-1 px-8 rounded-full"
                >
                  <SlCloudUpload />
                </button>
                <div className="text-center text-gray-500">
                  File Should be in PNG, JPEG or JPG format
                </div>
                <input
                  id="CoverImgClick"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            )}
          </div>

          {errors.file && (
            <span className="text-red-500 text-sm">{errors.file}</span>
          )}
          <p className="text-sm text-gray-500 mt-2">Max file size: 5 MB.</p>
        </div>

        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={competitionInfo.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter competition title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">
            Institute
          </label>
          <input
            type="text"
            name="institute"
            value={competitionInfo.institute}
            onChange={(e) => handleChange("institute", e.target.value)}
            placeholder="Enter institute name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={competitionInfo.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter competition description"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">Type</label>
          <input
            type="text"
            name="type"
            value={competitionInfo.type}
            onChange={(e) => handleChange("type", e.target.value)}
            placeholder="Enter competition type"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">Region</label>
          <input
            type="text"
            name="region"
            value={competitionInfo.region}
            onChange={(e) => handleChange("region", e.target.value)}
            placeholder="Enter competition region"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={competitionInfo.date}
            onChange={(e) => handleChange("date", e.target.value)}
            placeholder="Enter competition date"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className=" pt-5 ">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full relative h-[3rem] flex items-center active:scale-90 justify-center space-x-2 bg-green-500 text-white rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
          >
            {loading ? <ButtonLoading /> : "Add Competition"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Page;
