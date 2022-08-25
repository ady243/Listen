/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IoPause, IoPlay } from "react-icons/io5";

function Poster({ album }) {
  return (
    // <div
    //   className="w-[200] h-[500] rounded-none overflow-hidden relative text-white
    // cursor-pointer hover:scale-105 hover:text-white/100 transition
    //  duration-200 ease-out group-mx-auto space-y-3 top-1.5
    // "
    // >
    //   {/* {album.images.map((image) => (

    //   ))} */}
    //   <div>
    //     <img
    //       src={album.url}
    //       alt=""
    //       className="absolute inset-0 object-contain w-full h-full groupe-hover:opacity-100"
    //     />
    //   </div>

    //   <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
    //     <div
    //       className="h-10 w-10 bg-[#42cbcf] rounded-full flex items-center justify-center
    //     group-hover:bg-[#42cbcf] flex-shrink-0"
    //     >
    //       {/* <IoPause className="text-xl" /> */}
    //       <IoPlay className="text-l ml-[1px]" />
    //     </div>
    //   </div>
    // </div>
    <>
      <div
        className="w-[200] h-[200] rounded-none overflow-hidden relative text-white
    cursor-pointer hover:scale-105 hover:text-white/100 transition
     duration-200 ease-out group-mx-auto space-y-5 top-1.5
    "
      >
        <h2> {album.name} </h2>
        {/*show all images*/}
        {album.images.map((image) => (
          // eslint-disable-next-line react/jsx-key, @next/next/no-img-element
          <img
            src={image.url}
            alt=""
            width={500}
            height={500}
            className="absolute object-contain w-full h-full inset-1 groupe-hover:opacity-100"
          />
        ))}

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
