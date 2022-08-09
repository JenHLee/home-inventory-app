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

  const handleEdit = () => {};

  // const handleDelete = () => {};

  const handleSubmit = async (name) => {
    const newCategory = { name };

    try {
      const res = await axios.post(
        "http://localhost:3000/homeserver/api/categories",
        newCategory
      );
      if (res.status === 200) {
        alert("Category added");
        fetchCategories().then((data) => {
          setCategories(data);
        });
      } else {
        alert("Category is not added");
      }
    } catch (err) {}
  };

  const fetchCategories = async () => {
    const res = await axios.get(
      "http://localhost:3000/homeserver/api/categories/"
    );
    //setCategories(res.data);
    return res.data;
  };

  useEffect(() => {
    // console.log("useEffect in");
    fetchCategories().then((data) => {
      setCategories(data);
    });

    // console.log(`categories: ${JSON.stringify(categories)}`);
  }, []);

  return (
    <>
      {console.log(categories)}
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
        {categories ? (
          <Categories
            categories={categories}
            handleEdit={handleEdit}
            // handleDelete={handleDelete}
          />
        ) : (
          <span>Category is empty</span>
        )}
      </div>
    </>
  );
}

export default ManageCategory;
