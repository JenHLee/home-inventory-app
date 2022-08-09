import React from "react";
import Category from "../category/Category";
import "./categories.css";

export default function Categories(props) {
  const handleEdit = () => {
    props.handleEdit();
  };

  const handleDelete = () => {
    props.handleDelete();
  };

  return (
    <>
      <div className="categories">
        {props.categories.map((c) => (
          <Category
            key={c._id}
            categoryprop={c}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}
