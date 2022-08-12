import React from "react";

function Search({ search, setSearch }) {
  return (
    <div
      className="absolute inset-x-1 -top-20 max-w-[1150px]
       bg-[#dadada] rounded-full overflow-hidden border-4
     border-[#0bcb0133] p-1.5 px-5 pr-10 flex items-center m-24 "
    >
      <div
        className="flex-shrink-0 w-5 h-5 border-2
       border-[#000000] rounded-full animate-bounce"
      />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-[#dadada] border-none text-black lg:w-full focus:ring-0 outline-none 
       "
        placeholder="Recherche..."
      />
      <div className="flex items-center"></div>
    </div>
  );
}

export default Search;
