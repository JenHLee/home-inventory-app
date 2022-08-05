import "./category.css";

export default function Category({ category }) {
  console.log("category: " + category);
  console.log("category name: " + category.name);
  return (
    <>
        <div className="category">
          <div className="category_info">
            <span className="category_name" key={category.name}>
              {category.name}
            </span>
          </div>
        </div>
    </>
  );
}
