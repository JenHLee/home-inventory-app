import React from "react";

export default function CategoryList(prop) {
  return (
    <>
      {prop.categories.map((c) => (
        <option key={c.name} value={c.name}>{c.name}</option>
      ))}
    </>
  );
}
