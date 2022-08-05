import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import "./manageCategory.css";
import Categories from '../../../components/categories/Categories';

function ManageCategory() {
  const[categories, setCategories] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:3000/homeserver/api/categories" + search);
      setCategories(res.data);
    }
    fetchCategories();
  }, [search]);
  return (
    <div className='manageCategory'>
        <div className="manageCategory_top">
          <h1 className="manageCategory_h1">Manage Categories</h1>
          <div className="manageCategory_btn_div">
            <button className="manageCategory_btn_add">+ Add Category</button>
          </div>
        </div>
      <div className='manageCategory_table_div'>
      <Categories categories={categories} />
      </div>
    </div>
  )
}

export default ManageCategory

/*
const categories = [
  "clothes", "shoes", "pants"
];

function ManageCategory() {
  return (
    <div className='manageCategory'>
        <div className="manageCategory_top">
          <h1 className="manageCategory_h1">Manage Categories</h1>
          <div className="manageCategory_btn_div">
            <button className="manageCategory_btn_add">+ Add Category</button>
          </div>
        </div>
      <div className='manageCategory_table_div'>
         <table className='manageCategory_table'>
          {categories.map((category) =>
            <tr className='manageCategory_table_tr' key={category}>{category}</tr>)
          }
        </table>
      </div>
    </div>
  )
}*/