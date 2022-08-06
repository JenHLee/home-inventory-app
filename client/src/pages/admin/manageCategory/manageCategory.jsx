import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import "./manageCategory.css";
import Categories from "../../../components/categories/Categories";
import AddCategory from "../../../components/addCategory/AddCategory";

function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [addUserClicked, setAddUserClicked] = useState("false");
  const { search } = useLocation();

  const addUser = () => {
    setAddUserClicked("true");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        "http://localhost:3000/homeserver/api/categories/" + search
      );
      setCategories(res.data);
    };
    fetchCategories();
  }, [search]);

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
      {addUserClicked === "true" ? <AddCategory /> : null}
      <Categories categories={categories} />
    </div>
  );
}

export default ManageCategory;
