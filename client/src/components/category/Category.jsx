import React from "react";
import "./category.css";
import { useState } from "react";
// import { Context } from "../../context/Context";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Category(props) {
  const [editCategoryClicked, setEditCategoryClicked] = useState(false);

  const handleEdit = (e) => {
    const editedCategoryName = e.target.innerText;
    editedCategoryName && props.handleEdit(props.category, editedCategoryName);
    setEditCategoryClicked(false);
  };

  const handleDelete = () => {
    props.handleDelete(props.category);
  };

  return (
    <>
      {props.category ? (
        <div className="category">
          <div className="category_name_container">
            <p
              className="category_name"
              contentEditable={editCategoryClicked}
              suppressContentEditableWarning={true}
              onBlur={handleEdit}
            >
              {props.category.name}
            </p>
          </div>
          <div className="manage_icon">
            <EditIcon
              className="svg_icon"
              onClick={(e) => {
                setEditCategoryClicked(true);
              }}
            />
            <DeleteIcon
              className="svg_icon delete_icon"
              onClick={handleDelete}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
