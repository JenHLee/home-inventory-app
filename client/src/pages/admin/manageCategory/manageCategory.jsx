import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
//import { useLocation } from "react-router";
import "./manageCategory.css";
import Categories from "../../../components/categories/Categories";
import AddCategory from "../../../components/addCategory/AddCategory";
import Swal from "sweetalert2";

function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [addCategoryClicked, setAddCategoryClicked] = useState(false);

  const addCategory = () => {
    setAddCategoryClicked(true);
  };

  const handleEdit = async (category, name) => {
    const editedCategory = { name };
    // console.log("ManageCategory: " + name);
    try {
      const res = await axios.put(
        `http://localhost:3000/homeserver/api/categories/${category._id}`,
        editedCategory
      );
      if (res.status === 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Category is edited in successfuly",
        });
        fetchCategories().then((data) => {
          setCategories(data);
        });
      }
    } catch (err) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Category is not edited",
      });
    }
  };

  const handleDelete = async (category) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/homeserver/api/categories/${category._id}`
      );
      if (res.status === 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Category is deleted in successfuly",
        });
        fetchCategories().then((data) => {
          setCategories(data);
        });
      }
    } catch (err) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Category is not deleted",
      });
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
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Category is added in successfuly",
        });
        window.scrollTo(0, document.body.scrollHeight);

        fetchCategories().then((data) => {
          setCategories(data);
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Category is not added",
        });
      }
    } catch (err) {
      // console.log(err);
    }
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
      {/* {console.log(categories)} */}
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
