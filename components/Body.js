import { Search } from "heroicons-react";
import { useState } from "react";
import React from "react";

function Body() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  return (
    <section>
      <Search Search={setSearch} />
      <div
        className="grid grid-cols-2 py-4 overflow-y-scroll scrollbar-hide h-96 lg:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-8"
      ></div>
    </section>
  );
}

export default Body;
