import AddIcon from "@mui/icons-material/Add";
import { useRef } from "react";
import "./addCategory.css";

export default function AddCategory(props) {
  const inputRef = useRef();
  const formRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategoryName = inputRef.current.value;
    newCategoryName && props.handleSubmit(newCategoryName);
    formRef.current.reset();
  };

  return (
    <div className="addCategory">
      <div className="category_name_container">
        <form className="addcategory_form" ref={formRef}>
          <input
            type="text"
            name="categoryName"
            placeholder="Input new category name"
            className="add_category_input"
            ref={inputRef}
          />
          <AddIcon className="svg_icon" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
}
