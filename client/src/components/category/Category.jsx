import React from "react";
import "./category.css";
// import { useContext } from "react";
// import { Context } from "../../context/Context";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Category({ categoryprop }) {
  return (
    <>
      {categoryprop ? (
        <div className="category">
          <div className="category_name_container">
            <p className="category_name">{categoryprop.name}</p>
          </div>
          <div className="manage_icon">
            <EditIcon className="svg_icon" />
            <DeleteIcon className="svg_icon delete_icon" />
          </div>
        </div>
      ) : null}
    </>
  );
}
