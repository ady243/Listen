import { Search } from "heroicons-react";
import { useState } from "react";
import React from "react";

function Body() {
  const [search, setSearch] = useState("");
  return (
    <section>
      <Search Search={setSearch} />
    </section>
  );
}

export default Body;
