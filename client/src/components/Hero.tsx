"use client";

import Image from "next/image";
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeroImg from "@/assets/HeroImg.webp";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

interface CarouselItem {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface HeroProps {
  carousols: CarouselItem[];
}

const Hero: React.FC<HeroProps> = ({ carousols }) => {


  function SampleNextArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
      <div
        className="custom-next-arrow absolute top-1/2 z-[100] md:right-[10% right-[5%] transform -translate-y-1/2"
        onClick={onClick}
      >
        <MdOutlineKeyboardArrowRight
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)" }}
          className="text-[#fff] text-[3rem] md:text-[5rem] -mr-4 rounded-full cursor-pointer"
        />
      </div>
    );
  }

  function SamplePrevArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
      <div
        className="custom-next-arrow absolute z-[100] top-1/2 md:left-[10%] left-[5%] transform -translate-y-1/2"
        onClick={onClick}
      >
        <MdOutlineKeyboardArrowLeft
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)" }}
          className=" text-[3rem] md:text-[5rem] text-[#fff] rounded-full -ml-4 cursor-pointer  "
        />
      </div>
    );
  }


  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2010,
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows: true,
    waitForAnimate: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className=" z-40 ">
      <div className="   slider-container  ">
        <Slider {...settings} className="  ">
          {carousols &&
            carousols.map((carousol, idx) => (
              <div
                key={idx}
                className=" relative w-full h-[60vh] md:h-[90vh]  before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-30 before:bg-[#000]/60 "
              >
                <Image
                  src={carousol?.imageUrl || HeroImg}
                  fill
                  alt="heroimg"
                  className=" w-full h-full object-cover   "
                />
                <div className=" absolute top-0 left-0 text-[#fff] z-50 w-full h-full flex flex-col gap-8 items-center justify-center ">
                  <div className=" text-center flex flex-col gap-5 ">
                    <h2 className=" text-4xl md:text-5xl lg:text-6xl font-medium md:font-semibold max-w-[70rem] mx-auto  ">
                      {carousol.title}
                    </h2>
                    <h4 className=" md:text-lg lg:text-xl max-w-[40rem] mx-auto text-gray-200 ">
                      {carousol.description}
                    </h4>
                  </div>
                  <div className=" flex items-center gap-5 ">
                    <Link
                      href={"/"}
                      className=" bg-[#131313] text-[1rem]  px-8 py-2 rounded-full z-[1000000000000000] cursor-pointer "
                    >
                      Read More
                    </Link>
                    <Link
                      href={"/"}
                      className=" bg-green-500 px-8 py-2 rounded-full "
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            ))}

          {/* <div className=" relative w-full h-[60vh] md:h-[90vh]  before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-30 before:bg-black/60 ">
            <Image
              src={HeroImg2}
              alt="heroimg"
              className=" w-full h-full object-cover   "
            />
            <div className=" absolute top-0 left-0 text-[#fff] z-50 w-full h-full flex flex-col gap-8 items-center justify-center ">
              <div className=" text-center flex flex-col gap-5 ">
                <h1 className=" text-5xl md:text-6xl font-bold max-w-[70rem] mx-auto  ">
                  We Provide You Best Software and IT Solution For Your
                  Business.
                </h1>
                <h4 className=" text-xl md:text-xl max-w-[40rem] mx-auto text-gray-200 ">
                  GrowiX is globally recognized for providing top-notch customer
                  experiences and offering exemplary software and IT solution
                  services, solidifying our position as one of the leading
                  software development companies worldwide.
                </h4>
              </div>
              <div className=" flex items-center gap-5 ">
                <Link
                  href={"/services"}
                  className=" bg-[#0372BF] text-[1rem]  px-8 py-2 rounded-full z-[1000000000000000] cursor-pointer "
                >
                  Read More
                </Link>
                <Link
                  href={"/contact"}
                  className=" bg-green-500 px-8 py-2 rounded-full "
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className=" relative w-full h-[60vh] md:h-[90vh]  before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-30 before:bg-black/60 ">
            <Image
              src={HeroImg3}
              alt="heroimg"
              className=" w-full h-full object-cover   "
            />
            <div className=" absolute top-0 left-0 text-[#fff] z-50 w-full h-full flex flex-col gap-8 items-center justify-center ">
              <div className=" text-center flex flex-col gap-5 ">
                <h1 className=" text-5xl md:text-6xl font-bold max-w-[70rem] mx-auto  ">
                  We Provide You Best Software and IT Solution For Your
                  Business.
                </h1>
                <h4 className=" text-xl md:text-xl max-w-[40rem] mx-auto text-gray-200 ">
                  GrowiX is globally recognized for providing top-notch customer
                  experiences and offering exemplary software and IT solution
                  services, solidifying our position as one of the leading
                  software development companies worldwide.
                </h4>
              </div>
              <div className=" flex items-center gap-5 ">
                <Link
                  href={"/services"}
                  className=" bg-[#0372BF] text-[1rem]  px-8 py-2 rounded-full z-[1000000000000000] cursor-pointer "
                >
                  Read More
                </Link>
                <Link
                  href={"/contact"}
                  className=" bg-green-500 px-8 py-2 rounded-full "
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div> */}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
