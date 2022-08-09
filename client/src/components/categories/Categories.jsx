import React from "react";
import Category from "../category/Category";
import "./categories.css";

export default function Categories(props) {
  const handleEdit = (category, editedCategoryName) => {
    props.handleEdit(category, editedCategoryName);
  };

  const handleDelete = (category) => {
    props.handleDelete(category);
  };

  return (
    <>
      <div className="categories">
        {props.categories.map((c) => (
          <Category
            key={c._id}
            category={c}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}
