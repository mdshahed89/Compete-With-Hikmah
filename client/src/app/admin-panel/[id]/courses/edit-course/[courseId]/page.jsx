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
  const { id, courseId } = React.use(params);
  const [courseInfo, setCourseInfo] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    price: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setCourseInfo({ ...courseInfo, [name]: value });
  };

  const fetchCourseInfo = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/course/${courseId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCourseInfo({
          title: data?.course?.title || "",
          description: data?.course?.description || "",
          instructor: data?.course?.instructor || "",
          duration: data?.course?.duration || "",
          price: data?.course?.price || "",
          imageUrl: data?.course?.imageUrl || "",
        });
      } else {
        console.log(data.message || "Failed to fetch course!");
        router.push(`/admin-panel/${id}/courses`);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch course:", error);
      router.push(`/admin-panel/${id}/courses`);
    } finally {
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    fetchCourseInfo();
  }, []);

  const updateCourseHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/course/${courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseInfo),
        }
      );

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        toast.success("Course Updated successfully!");
      } else {
        toast.error(data.message || "Failed to update course!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting update blog:", error);
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
            setCourseInfo({
              ...courseInfo,
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
    setCourseInfo({
      ...courseInfo,
      imageUrl: "",
    });
  };

  // console.log(blogInfo);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[800px] mx-auto md:mt-8 px-3 md:px-8 py-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl"
    >
      <div className="flex items-center space-x-2 mb-10 justify-between">
        <h2 className="text-3xl font-semibold text-gray-800">Update Course</h2>
        <Link
          href={`/admin-panel/${id}/courses`}
          className=" p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] "
        >
          <IoArrowBackSharp />
        </Link>
      </div>

      <form onSubmit={updateCourseHandler} className="space-y-3">
        <div className="w-full max-w-[25rem] ">
          <label className="block text-gray-600 font-medium mb-1">
            Cover Image
          </label>

          <div className="flex h-[20rem] border-2 rounded-md border-[#17DB4F]">
            {courseInfo.imageUrl ? (
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
                    src={courseInfo.imageUrl}
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
            value={courseInfo.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter course title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">Instructor</label>
          <input
            type="text"
            name="instructor"
            value={courseInfo.instructor}
            onChange={(e) => handleChange("instructor", e.target.value)}
            placeholder="Enter instructor name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">
            Duration
          </label>
          <textarea
            name="duration"
            rows={5}
            value={courseInfo.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            placeholder="Enter course duration"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={courseInfo.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="Enter course price"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={courseInfo.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter course description"
            required
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className=" pt-5 ">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full relative h-[3rem] flex items-center active:scale-90 justify-center space-x-2 bg-green-500 text-white rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
          >
            {loading ? <ButtonLoading /> : "Update Course"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Page;
