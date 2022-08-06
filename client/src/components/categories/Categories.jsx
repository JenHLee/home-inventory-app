import React from "react";
import Category from "../category/Category";
import "./categories.css";

export default function Categories({ categories }) {
  return (
    <>
      <div className="categories">
        {categories.map((c) => (
          <Category key={c._id} categoryprop={c} />
        ))}
      </div>
    </>
  );
}
