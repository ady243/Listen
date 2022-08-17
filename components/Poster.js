import React from "react";

function Poster({ track }) {
  return (
    <div
      className="w-[260] h-[360] rounded-none overflow-hidden relative text-white
    cursor-pointer hover:scale-105 hover:text-white/100 transition
     duration-200 ease-out group-mx-auto
    "
    >
      //lien qui devait afficher les images direct avec l'api de spotify
      <img src={track.albumUrl} alt="" />
    </div>
  );
}

export default Poster;
