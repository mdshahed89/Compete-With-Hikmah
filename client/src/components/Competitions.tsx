"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

interface CompetitionItem {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  institute: string;
  region: string;
  type: string;
  date: string;
  __v: number;
}

interface CompetitionProps {
  competitions: CompetitionItem[];
}

const Competitions: React.FC<CompetitionProps> = ({ competitions }) => {
  const [selectedType, setselectedType] = useState("All Type");
  const [selectedRegion, setselectedRegion] = useState("All Region");
  const [selectedInstitute, setselectedInstitute] = useState("All Institute");
  const [infoOpen, setInfoOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [instituteOpen, setInstituteOpen] = useState(false);

  const typeRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const instituteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setInfoOpen(false);
      }
      if (
        regionRef.current &&
        !regionRef.current.contains(event.target as Node)
      ) {
        setRegionOpen(false);
      }
      if (
        instituteRef.current &&
        !instituteRef.current.contains(event.target as Node)
      ) {
        setInstituteOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredCompetitions = competitions.filter((comp) => {
    const typeMatch =
      selectedType.toLowerCase() === "all type" ||
      comp.type?.toLowerCase() === selectedType.toLowerCase();

    const regionMatch =
      selectedRegion.toLowerCase() === "all region" ||
      comp.region?.toLowerCase() === selectedRegion.toLowerCase();

    const instituteMatch =
      selectedInstitute.toLowerCase() === "all institute" ||
      comp.institute?.toLowerCase() === selectedInstitute.toLowerCase();

    return typeMatch && regionMatch && instituteMatch;
  });

  return (
    <div className=" max-w-[1400px] mx-auto py-[3rem] px-2 ">
      <h2 className=" text-[2rem] font-semibold text-center text-green-500  ">
        Recent Competitions
      </h2>

      <div className=" mt-[4rem] flex items-center gap-3 justify-end ">
        <div className="  relative w-[10rem] " ref={typeRef}>
          <div
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
            onClick={() => setInfoOpen(!infoOpen)}
          >
            {selectedType}
          </div>
          {infoOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
              {["All Type", "Hackathon", "Robo Soccer"].map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    // handleChange("type", option);
                    setselectedType(option);
                    setInfoOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="  relative w-[10rem] " ref={regionRef}>
          <div
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
            onClick={() => setRegionOpen(!regionOpen)}
          >
            {selectedRegion}
          </div>
          {regionOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
              {["All Region", "North", "South"].map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setselectedRegion(option);
                    setRegionOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="  relative w-[10rem] " ref={instituteRef}>
          <div
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
            onClick={() => setInstituteOpen(!instituteOpen)}
          >
            {selectedInstitute}
          </div>
          {instituteOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
              {["All Institute", "Institute A", "Institute B"].map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    // handleChange("type", option);
                    setselectedInstitute(option);
                    setInstituteOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-[1rem]">
        {filteredCompetitions &&
          filteredCompetitions.slice(0, 3).map((ctp, idx) => (
            <div key={idx}>
              <Card ctp={ctp} />
            </div>
          ))}
      </div>
      <div className=" mt-[2rem] flex justify-end ">
        <Link
          href={`/competitions`}
          className=" border-b-2 border-green-500 px-1 pb-1 flex items-center gap-2 w-fit font-medium hover:text-green-500 transition-colors duration-300 ease-in-out "
        >
          Explore More <GoArrowUpRight className=" text-[1.3rem] " />
        </Link>
      </div>
    </div>
  );
};

export default Competitions;

export const PageCompetitions: React.FC<CompetitionProps> = ({
  competitions,
}) => {
  const [selectedType, setselectedType] = useState("All Type");
  const [selectedRegion, setselectedRegion] = useState("All Region");
  const [selectedInstitute, setselectedInstitute] = useState("All Institute");
  const [infoOpen, setInfoOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [instituteOpen, setInstituteOpen] = useState(false);

  const typeRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const instituteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setInfoOpen(false);
      }
      if (
        regionRef.current &&
        !regionRef.current.contains(event.target as Node)
      ) {
        setRegionOpen(false);
      }
      if (
        instituteRef.current &&
        !instituteRef.current.contains(event.target as Node)
      ) {
        setInstituteOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredCompetitions = competitions.filter((comp) => {
    const typeMatch =
      selectedType.toLowerCase() === "all type" ||
      comp.type?.toLowerCase() === selectedType.toLowerCase();

    const regionMatch =
      selectedRegion.toLowerCase() === "all region" ||
      comp.region?.toLowerCase() === selectedRegion.toLowerCase();

    const instituteMatch =
      selectedInstitute.toLowerCase() === "all institute" ||
      comp.institute?.toLowerCase() === selectedInstitute.toLowerCase();

    return typeMatch && regionMatch && instituteMatch;
  });

  return (
    <div className=" max-w-[1400px] mx-auto py-[3rem] px-2 ">
      <h2 className=" text-[2rem] font-semibold text-center text-green-500  ">
        All Competitions
      </h2>

      <div className=" mt-[4rem] flex items-center gap-3 justify-end ">
        <div className="  relative w-[10rem] " ref={typeRef}>
          <div
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
            onClick={() => setInfoOpen(!infoOpen)}
          >
            {selectedType}
          </div>
          {infoOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
              {["All Type", "Hackathon", "Robo Soccer"].map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    // handleChange("type", option);
                    setselectedType(option);
                    setInfoOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="  relative w-[10rem] " ref={regionRef}>
          <div
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
            onClick={() => setRegionOpen(!regionOpen)}
          >
            {selectedRegion}
          </div>
          {regionOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
              {["All Region", "North", "South"].map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setselectedRegion(option);
                    setRegionOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="  relative w-[10rem] " ref={instituteRef}>
          <div
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
            onClick={() => setInstituteOpen(!instituteOpen)}
          >
            {selectedInstitute}
          </div>
          {instituteOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
              {["All Institute", "Institute A", "Institute B"].map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    // handleChange("type", option);
                    setselectedInstitute(option);
                    setInstituteOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-[1rem]">
        {filteredCompetitions &&
          filteredCompetitions.map((ctp, idx) => (
            <div key={idx}>
              <Card ctp={ctp} />
            </div>
          ))}
      </div>
    </div>
  );
};

const Card = ({ ctp }: {ctp: CompetitionItem}) => {
  // console.log(ctp);

  return (
    <div className=" shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-md overflow-hidden ">
      <div className=" relative w-full h-[17rem]   ">
        <Image
          src={ctp?.imageUrl}
          fill
          alt="Competition Img"
          className=" w-full h-full object-cover "
        />
      </div>
      <div className=" p-[1rem] ">
        <div className=" text-[1.4rem] font-medium ">{ctp?.title}</div>
        <p className=" mt-2 mb-4 text-[#4b4b4b] ">
          {ctp?.date &&
            new Date(ctp.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </p>
        <div>{ctp?.description}</div>
      </div>
    </div>
  );
};
