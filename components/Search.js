import { useState } from "react";

function Search({}) {
  const [search, setSearch] = useState("");
  return (
    <div
      className="absolute inset-x-3 -top-20 max-w-[1150px]
       bg-[#dadada] rounded-full overflow-hidden border-4
       border-[#42cbcf] p-0.1 px-5 pr-10 flex items-center m-24 font-sans "
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
        placeholder="Recherche.."
      />
    </div>
  );
}

export default Search;
