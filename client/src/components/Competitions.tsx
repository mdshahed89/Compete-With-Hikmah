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

  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [filteredInstitutes, setFilteredInstitutes] = useState<string[]>([]);

  const [infoOpen, setInfoOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);

  const typeRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

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
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      setSearchOpen(false);
      return;
    }

    const lowerValue = value.toLowerCase();
    const matches = competitions.filter(
      (comp) =>
        comp.title.toLowerCase().includes(lowerValue) ||
        comp.institute.toLowerCase().includes(lowerValue)
    );

    const matchedInstitutes = [
      ...new Set(
        matches
          .map((c) => c.institute)
          .filter((i) => i.toLowerCase().includes(lowerValue))
      ),
    ];

    setFilteredInstitutes(matchedInstitutes);
    setSearchOpen(matchedInstitutes.length > 0);
  };

  const filteredCompetitions = competitions.filter((comp) => {
    const typeMatch =
      selectedType.toLowerCase() === "all type" ||
      comp.type?.toLowerCase() === selectedType.toLowerCase();

    const regionMatch =
      selectedRegion.toLowerCase() === "all region" ||
      comp.region?.toLowerCase() === selectedRegion.toLowerCase();

    const searchMatch =
      searchTerm.trim() === "" ||
      comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.institute.toLowerCase().includes(searchTerm.toLowerCase());

    return typeMatch && regionMatch && searchMatch;
  });

  return (
    <div className=" max-w-[1400px] mx-auto py-[3rem] px-2 ">
      <h2 className=" text-[2rem] font-semibold text-center text-green-500  ">
        Recent Competitions
      </h2>

      <div className=" mt-[4rem] flex items-center gap-3 justify-between flex-wrap">
        <div className="relative w-full max-w-[35rem]" ref={searchRef}>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-lg outline-none "
            placeholder="Search title or institute"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-[12rem] overflow-y-auto">
              {filteredInstitutes.map((inst, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(inst);
                    setSearchOpen(false);
                  }}
                >
                  {inst}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className=" flex items-center justify-end md:w-auto w-full gap-2 ">
          <div className="relative w-[10rem]" ref={typeRef}>
            <div
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
              onClick={() => setInfoOpen(!infoOpen)}
            >
              {selectedType}
            </div>
            {infoOpen && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-[15rem] overflow-y-auto">
                {[
                  "All Type",
                  "Hackathon",
                  "Project Showcase",
                  "Poster Presentation",
                  "Robo Soccer",
                  "Drone Race",
                  "Debate",
                  "Case Study",
                  "Techathon",
                  "Programming Contest",
                ].map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
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

          <div className="relative w-[10rem]" ref={regionRef}>
            <div
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
              onClick={() => setRegionOpen(!regionOpen)}
            >
              {selectedRegion}
            </div>
            {regionOpen && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-[15rem] overflow-y-auto">
                {[
                  "All Region",
                  "Dhaka",
                  "Chattogram",
                  "Khulna",
                  "Rajshahi",
                  "Barishal",
                  "Sylhet",
                  "Rangpur",
                  "Mymensingh",
                ].map((option) => (
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
        </div>
      </div>

      {filteredCompetitions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-[2rem]">
          {filteredCompetitions.slice(0, 4).map((ctp, idx) => (
            <div key={idx}>
              <Card ctp={ctp} />
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-[20rem] flex items-center justify-center text-[1.1rem] font-medium text-gray-500">
          There are no competitions yet.
        </div>
      )}

      <div className="mt-[2rem] flex justify-end">
        <Link
          href={`/competitions`}
          className="border-b-2 border-green-500 px-1 pb-1 flex items-center gap-2 w-fit font-medium hover:text-green-500 transition-colors duration-300 ease-in-out"
        >
          Explore More <GoArrowUpRight className="text-[1.3rem]" />
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

  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [filteredInstitutes, setFilteredInstitutes] = useState<string[]>([]);

  const [infoOpen, setInfoOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);

  const typeRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

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
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      setSearchOpen(false);
      return;
    }

    const lowerValue = value.toLowerCase();
    const matches = competitions.filter(
      (comp) =>
        comp.title.toLowerCase().includes(lowerValue) ||
        comp.institute.toLowerCase().includes(lowerValue)
    );

    const matchedInstitutes = [
      ...new Set(
        matches
          .map((c) => c.institute)
          .filter((i) => i.toLowerCase().includes(lowerValue))
      ),
    ];

    setFilteredInstitutes(matchedInstitutes);
    setSearchOpen(matchedInstitutes.length > 0);
  };

  const filteredCompetitions = competitions.filter((comp) => {
    const typeMatch =
      selectedType.toLowerCase() === "all type" ||
      comp.type?.toLowerCase() === selectedType.toLowerCase();

    const regionMatch =
      selectedRegion.toLowerCase() === "all region" ||
      comp.region?.toLowerCase() === selectedRegion.toLowerCase();

    // const instituteMatch =
    //   selectedInstitute.toLowerCase() === "all institute" ||
    //   comp.institute?.toLowerCase() === selectedInstitute.toLowerCase();

    const searchMatch =
      searchTerm.trim() === "" ||
      comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.institute.toLowerCase().includes(searchTerm.toLowerCase());

    return typeMatch && regionMatch && searchMatch;
  });

  return (
    <div className=" max-w-[1400px] mx-auto py-[3rem] px-2 ">
      <h2 className=" text-[2rem] font-semibold text-center text-green-500  ">
        All Competitions
      </h2>

      <div className=" mt-[4rem] flex items-center gap-3 justify-between flex-wrap">
        <div className="relative w-full max-w-[35rem]" ref={searchRef}>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-lg outline-none "
            placeholder="Search title or institute"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-[12rem] overflow-y-auto">
              {filteredInstitutes.map((inst, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(inst);
                    setSearchOpen(false);
                  }}
                >
                  {inst}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className=" flex items-center justify-end md:w-auto w-full gap-2 ">
          <div className="relative w-[10rem]" ref={typeRef}>
            <div
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
              onClick={() => setInfoOpen(!infoOpen)}
            >
              {selectedType}
            </div>
            {infoOpen && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-[15rem] overflow-y-auto">
                {[
                  "All Type",
                  "Hackathon",
                  "Project Showcase",
                  "Poster Presentation",
                  "Robo Soccer",
                  "Drone Race",
                  "Debate",
                  "Case Study",
                  "Techathon",
                  "Programming Contest",
                ].map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
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

          <div className="relative w-[10rem]" ref={regionRef}>
            <div
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
              onClick={() => setRegionOpen(!regionOpen)}
            >
              {selectedRegion}
            </div>
            {regionOpen && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-[15rem] overflow-y-auto">
                {[
                  "All Region",
                  "Dhaka",
                  "Chattogram",
                  "Khulna",
                  "Rajshahi",
                  "Barishal",
                  "Sylhet",
                  "Rangpur",
                  "Mymensingh",
                ].map((option) => (
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
        </div>
      </div>

      {filteredCompetitions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-[2rem]">
          {filteredCompetitions.slice(0, 4).map((ctp, idx) => (
            <div key={idx}>
              <Card ctp={ctp} />
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-[20rem] flex items-center justify-center text-[1.1rem] font-medium text-gray-500">
          There are no competitions yet.
        </div>
      )}
    </div>
  );
};

const Card = ({ ctp }: { ctp: CompetitionItem }) => {
  // console.log(ctp);

  return (
    <Link
      href={`/competitions/${ctp?._id}`}
      className="flex flex-col justify-between shadow-[0px_1px_10px_rgba(0,0,0,0.15)] h-full rounded-md overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative w-full h-[17rem] md:h-[14rem]">
        <Image
          src={ctp?.imageUrl}
          fill
          alt="Competition Img"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-[1rem]">
        <div className="flex-1">
          <div className="text-[1.4rem] font-medium line-clamp-1">
            {ctp?.title}
          </div>
          <p className="mt-2 mb-4 text-[#4b4b4b] font-semibold">
            {ctp?.date &&
              new Date(ctp.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </p>
          <div className="line-clamp-2 text-gray-500">{ctp?.description}</div>
        </div>

        {/* Bottom Section */}
        <div className="pt-5 text-right">
          <div className="underline text-green-500 hover:text-green-400 transition-colors duration-300 ease-in-out ">
            Read More...
          </div>
        </div>
      </div>
    </Link>
  );
};
