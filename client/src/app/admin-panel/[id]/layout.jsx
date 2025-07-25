"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { FaBell, FaCheckCircle, FaUser } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { LuPanelLeftClose } from "react-icons/lu";
import { useData } from "@/context/Context";
import { GoHome } from "react-icons/go";
import { MdOutlineAssignment } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { MdOutlineSchedule } from "react-icons/md";
import { BsInfoSquare } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import LoadingPage from "@/components/PageLoading";
import { FaRegUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { VscFeedback } from "react-icons/vsc";
// import { ProfileModal } from "@/components/Modals";
import { AiOutlineBars } from "react-icons/ai";
import { HiMiniBars2 } from "react-icons/hi2";
import { HiMiniBars3 } from "react-icons/hi2";

export default function DashboardLayout({ children, params }) {
  const { userData, setUserData } = useData();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const currentPath = usePathname();
  const { id } = React.use(params);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSideBarOpen(false);
    }
    setIsLoading(false);
  }, []);

  const router = useRouter();

  const optionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        if (window.innerWidth < 768) {
          setSideBarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const decodeToken = jwtDecode(userData.token);

        if (decodeToken?.userId !== id) {
          router.push("/");
          // console.log("id not same", decodeToken?.userId, id);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // setUserData({});
        // router.push("/");
      }
    };

    if (userData?.token) {
      checkAuth();
    } else {
      // router.push("/");
      console.log("token not found");
    }
  }, [router, userData]);

  const items = [
    {
      title: "Overview",
      icon: <GoHome className=" text-[1.3rem] " />,
      pathName: `/admin-panel/${id}`,
    },
    {
      title: "Users",
      icon: <MdOutlineAssignment className=" text-[1.3rem] " />,
      pathName: `/admin-panel/${id}/users`,
    },
    {
      title: "Competitions",
      icon: <MdOutlineSchedule className=" text-[1.3rem] " />,
      pathName: `/admin-panel/${id}/competitions`,
    },
    {
      title: "Blogs",
      icon: <CgDetailsMore className=" text-[1.3rem] " />,
      pathName: `/admin-panel/${id}/blogs`,
    },
    {
      title: "Carousels",
      icon: <BsInfoSquare className=" text-[1.1rem] " />,
      pathName: `/admin-panel/${id}/carousels`,
    },
    {
      title: "Courses",
      icon: <BsInfoSquare className=" text-[1.1rem] " />,
      pathName: `/admin-panel/${id}/courses`,
    },
  ];

  // const isPathInItems = items.some((item) =>
  //   currentPath.includes(item.pathName)
  // );

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className=" font-Georama max-h-[100vh] overflow-x-hidden ">
      <div className="">
        <div className=" relative flex min-h-[100vh] w-full overflow-hidden">
          <div
            ref={optionRef}
            className={` ${
              sideBarOpen
                ? window.innerWidth < 768 && "inboxSideBarOpen"
                : window.innerWidth < 768 && "inboxSideBarClose"
            } bg-[#2C2C2C] w-[20rem] flex-shrink-0 z-50 md:relative absolute md:h-auto h-full transition-all duration-300 ease-linear flex flex-col justify-between gap-2  px-1 md:px-3 py-5 overflow-y-auto `}
          >
            <div>
              <div className=" pb-[4rem] pl-5 ">
                <Link
                  href={`/`}
                  className=" text-[#fff] text-[2rem] font-semibold   "
                >
                  Hikmah
                </Link>
              </div>
              <div className={` flex flex-col gap-1 mt-10 `}>
                {items.map((item, idx) => (
                  <div key={idx}>
                    <Link href={`${item.pathName}`}>
                      <div
                        onClick={() => {
                          if (window.innerWidth < 768) {
                            setSideBarOpen(false);
                          }
                        }}
                        className={`cursor-pointer ${
                          currentPath === item.pathName
                            ? "bg-green-50  text-green-500 "
                            : "text-[#fff]"
                        } group flex items-center gap-4 text-[1.1rem] hover:bg-green-50 rounded-md hover:text-green-500 px-3  py-2   transition-all duration-300 ease-in-out font-medium  `}
                      >
                        <div
                          className={`${
                            currentPath === item.pathName
                              ? "text-green-500"
                              : "text-white"
                          } group-hover:text-green-500 transition-all duration-300 ease-linear`}
                        >
                          {item.icon}
                        </div>
                        <span className={` group-hover:text-green-500`}>
                          {item.title}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className={` md:hidden flex justify-end pr-2 `}>
              <div
                onClick={() => setSideBarOpen(false)}
                className={` w-fit p-2 bg-white cursor-pointer rounded-full `}
              >
                <LuPanelLeftClose
                  className={` text-[1.5rem] text-[#00712D] `}
                />
              </div>
            </div>
          </div>

          <div className=" flex-1 max-w-[100vw] ">
            <div className=" flex items-center justify-between w-full px-5 h-[4.5rem] bg-[#2C2C2C]  ">
              <div
                onClick={() => setSideBarOpen(true)}
                className=" md:hidden block "
              >
                <HiMiniBars3 className=" text-[#fff] text-[1.4rem] " />
              </div>
              <h3 className=" text-[2rem] font-medium text-white ">
                Admin Panel
              </h3>
              {/* <ProfileModal id={id} isPathInItems={isPathInItems} /> */}
              <div className=" w-[3.5rem] h-[3.5rem] rounded-full bg-gray-400 "></div>
            </div>
            <div className=" h-[calc(100vh-4.5rem)] w-full relative overflow-y-auto p-2 pb-[1.5rem] ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
