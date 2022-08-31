import React from "react";
import Image from "next/image";
import { IoCompass, IoHome, IoAddOutline, IoHeart } from "react-icons/io5";
import Link from "next/link";

function Sidebar() {
  return (
    <section className="fixed -top-1 z-40 flex-col items-center p-4 bg-black w-[85px]  space-y-8 h-screen ">
      <Image
        src="https://zupimages.net/up/22/33/khud.jpeg"
        width={90}
        height={95}
        objectFit="contain"
        className=""
        alt="Listen"
      />

      <div className="flex flex-col space-y-8">
        <Link href="/" className="flex items-center space-x-3">
          <IoHome className="text-4xl text-white cursor-pointer siderbarIcon" />
        </Link>
        <Link href="Decouv" className="flex items-center space-x-3">
          <IoCompass className="text-4xl text-white cursor-pointer siderbarIcon" />
        </Link>
        <Link href="/my" className="flex items-center space-x-3">
          <IoHeart className="text-4xl text-white cursor-pointer siderbarIcon" />
        </Link>
        <IoAddOutline className="text-4xl text-white cursor-pointer siderbarIcon" />
      </div>
    </section>
  );
}

export default Sidebar;
