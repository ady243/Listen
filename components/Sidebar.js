import React from "react";
import Image from "next/image";

function Sidebar() {
  return (
    <section className="fixed top-0 z-40 flex-col items-center p-4 bg-black w-[90px] h-screen space-y-8">
      <Image
        src="https://zupimages.net/up/22/32/zsuo.jpg"
        width={80}
        height={75}
        objectFit="contain"
      />
    </section>
  );
}

export default Sidebar;
