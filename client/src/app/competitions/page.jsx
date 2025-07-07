import React from "react";
import Header from "@/components/Header";
import {PageCompetitions} from "@/components/Competitions";
import Footer from "@/components/Footer";

const page = async () => {

  let competitions = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/competition`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();

    competitions = data?.competitions || [];
  } catch (error) {
    console.error("Error fetching carousel data:", error);
  }

  return (
    <div>
      <Header />
      <div className=" min-h-[100vh] ">
        <div className=" relative w-full h-[10rem] bg-green-800  ">
        <div className=" w-full h-full text-[3rem] font-medium text-[#fff] flex items-center justify-center ">
          Competitions
        </div>
      </div>
      <PageCompetitions competitions={competitions} />
      </div>
      <Footer />
    </div>
  );
};

export default page;
