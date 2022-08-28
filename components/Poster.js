import React from "react";
import { IoPause, IoPlay } from "react-icons/io5";
import Image from "next/image";

function Poster({ songs }) {
  return (
    <>
      <div
        className="w-[260] h-[360] rounded-none overflow-hidden relative text-white
    cursor-pointer hover:scale-105 hover:text-white/100 transition
     duration-200 ease-out group-mx-auto space-y-5 top-1.5
    "
      >
        <Image
          src={songs}
          alt=""
          className="absolute inset-0 object-contain w-full h-full groupe-hover:opacity-100"
        />
        <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
          <div
            className="h-10 w-10 bg-[#42cbcf] rounded-full flex items-center justify-center
        group-hover:bg-[#42cbcf] flex-shrink-0"
          >
            {/* <IoPause className="text-xl" /> */}
            <IoPlay className="text-l ml-[1px]" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Poster;
