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
  const [carouselInfo, setCarouselInfo] = useState({
    title: "",
    description: "",
    link: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setCarouselInfo({ ...carouselInfo, [name]: value });
  };

  const addCarouselHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/carousel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carouselInfo),
        }
      );

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        toast.success("Carousel added successfully!");
        setCarouselInfo({
          title: "",
          description: "",
          link: "",
          imageUrl: "",
        });
      } else {
        toast.error(data.message || "Failed to add carousel!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting carousel:", error);
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
            setCarouselInfo({
              ...carouselInfo,
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
      }
    }
  };

  const handleClearFile = () => {
    setErrors((prev) => ({ ...prev, file: null }));
    setCarouselInfo({
      ...carouselInfo,
      imageUrl: "",
    });
  };

  // console.log();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[800px] mx-auto md:mt-8 px-3 md:px-8 py-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl"
    >
      <div className="flex items-center space-x-2 mb-10 justify-between">
        <h2 className="text-3xl font-semibold text-gray-800">Add Carousel</h2>
        <Link
          href={`/admin-panel/${id}/carousels`}
          className=" p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] "
        >
          <IoArrowBackSharp />
        </Link>
      </div>

      <form onSubmit={addCarouselHandler} className="space-y-3">
        <div className="w-full ">
          <label className="block text-gray-600 font-medium mb-1">
            Cover Image
          </label>

          <div className="flex h-[20rem] border-2 rounded-md border-[#17DB4F]">
            {carouselInfo.imageUrl ? (
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
                    src={carouselInfo.imageUrl}
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
            value={carouselInfo.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter carousel title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">
            Description
          </label>
          <textarea
            rows={2}
            name="description"
            value={carouselInfo.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter carousel description"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">Link</label>
          <input
            type="text"
            name="link"
            value={carouselInfo.link}
            onChange={(e) => handleChange("link", e.target.value)}
            placeholder="Enter carousel link"
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
            {loading ? <ButtonLoading /> : "Add Carousel"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Page;
