import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
//import { useLocation } from "react-router";
import "./manageCategory.css";
import Categories from "../../../components/categories/Categories";
import AddCategory from "../../../components/addCategory/AddCategory";

function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [addCategoryClicked, setAddCategoryClicked] = useState(false);

  const addCategory = () => {
    setAddCategoryClicked(true);
  };

  const handleEdit = async (category, name) => {
    const editedCategory = { name };
    console.log("ManageCategory: " + name);
    try {
      const res = await axios.put(
        `http://localhost:3000/homeserver/api/categories/${category._id}`,
        editedCategory
      );
      if (res.status === 200) {
        alert("Category edited");
        fetchCategories().then((data) => {
          setCategories(data);
        });
      }
    } catch (err) {
      alert("Category is not edited");
    }
  };

  const handleDelete = async (category) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/homeserver/api/categories/${category._id}`
      );
      if (res.status === 200) {
        alert("Category deleted");
        fetchCategories().then((data) => {
          setCategories(data);
        });
      }
    } catch (err) {
      alert("Category is not deleted");
    }
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
    return res.data;
  };

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <>
      {console.log(categories)}
      <div className="home">
        <div className="manageCategory_top">
          <h1 className="manageCategory_h1">Manage Categories</h1>
          <div className="manageCategory_btn_div">
            <button className="manageCategory_btn_add" onClick={addCategory}>
              + Add Category
            </button>
          </div>
        </div>
        {addCategoryClicked === true ? (
          <AddCategory handleSubmit={handleSubmit} />
        ) : null}
        {categories ? (
          <Categories
            categories={categories}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ) : (
          <span>Category is empty</span>
        )}
      </div>
    </>
  );
}

export default ManageCategory;
