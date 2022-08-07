import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
//import { useLocation } from "react-router";
import "./manageCategory.css";
import Categories from "../../../components/categories/Categories";
import AddCategory from "../../../components/addCategory/AddCategory";

function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [addUserClicked, setAddUserClicked] = useState("false");

  const addUser = () => {
    setAddUserClicked("true");
  };

  const handleSubmit = async (name) => {
    const newCategory = { name };

    try {
      const res = await axios.post(
        "http://localhost:3000/homeserver/api/categories",
        newCategory
      );
      if (res.status === 200) {
        alert("Category added");
      } else {
        alert("Category is not added");
      }
    } catch (err) {}
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        "http://localhost:3000/homeserver/api/categories/"
      );
      setCategories(res.data);
    };
    fetchCategories();
  });

  return (
    <div className="home">
      <div className="manageCategory_top">
        <h1 className="manageCategory_h1">Manage Categories</h1>
        <div className="manageCategory_btn_div">
          <button className="manageCategory_btn_add" onClick={addUser}>
            + Add Category
          </button>
        </div>
      </div>
      {addUserClicked === "true" ? (
        <AddCategory handleSubmit={handleSubmit} />
      ) : null}
      <Categories categories={categories} />
    </div>
  );
}

export default ManageCategory;
