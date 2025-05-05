"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";
import { ButtonLoading, SubPageLoading } from "@/components/PageLoading";
import { toast } from "react-toastify";

const Page = ({ params }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: "",
  });
  const { id, userId } = React.use(params);
  const [loading, setLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const handleChange = (name, value) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const fetchUserInfo = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/auth/users/${userId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setUserInfo({
          name: data?.name,
          email: data?.email,
          role: data?.role,
        });
      } else {
        console.log(data.message || "Failed to fetch users!");
        // router.push("/dashboard/helper-info");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch drivers:", error);
      // router.push("/dashboard/helper-info");
    } finally {
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const updateHelperHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/auth/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        toast.success("User Updated successfully!");
      } else {
        toast.error(data.message || "Failed to update user!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting update user:", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log("h", helperDetails?.helperID);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[800px] mx-auto md:mt-8 px-3 md:px-8 py-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl"
    >
      <div className="flex items-center space-x-2 mb-10 justify-between">
        <h2 className="text-3xl font-semibold text-gray-800">
          Update User Info
        </h2>
        <Link
          href={`/admin-panel/${id}/users`}
          className=" p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] "
        >
          <IoArrowBackSharp />
        </Link>
      </div>

      {isLoading1 ? (
        <div className=" relative min-h-[20rem] ">
          <SubPageLoading />
        </div>
      ) : (
        <form onSubmit={updateHelperHandler} className="space-y-3">
          <div className=" mt-3 ">
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter user name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className=" mt-3 ">
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userInfo?.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter user email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className=" mt-3 ">
            <label className="block text-gray-600 font-medium mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={userInfo.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="Enter role"
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
              {loading ? <ButtonLoading /> : "Update User Info"}
            </motion.button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default Page;
