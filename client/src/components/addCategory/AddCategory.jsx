import AddIcon from "@mui/icons-material/Add";
export default function AddCategory() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="category">
      <div className="category_name_container">
        <form className="addcategory_form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="categoryName"
            placeholder="Input new category name"
            className="add_category_input"
          />
          <AddIcon className="svg_icon" type="submit" />
        </form>
      </div>
    </div>
  );
}
