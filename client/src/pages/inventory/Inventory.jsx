import { useEffect, useState } from "react";
import Items from "../../components/items/Items";
import "./inventory.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router";

export default function Home() {
  const [items, setItems] = useState([]);
  const { user } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState();
  // const search  = useLocation();

  const handleCategoryClicked = (e) => {
    if (e.target.innerText === "All") {
      window.location.replace("/inventory");
    }
    filterCategories(e.target.innerText);
  };

  const filterCategories = async (filter) => {
    const res = await axios.get(
      `http://localhost:3000/homeserver/api/items/filter/${filter}`
    );
    setCategoryFilter(filter);
    setItems(res.data);
  };

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(
        "http://localhost:3000/homeserver/api/categories"
      );
      setCategories(res.data);
    };
    getCategories();

    const fetchitems = async () => {
      console.log("fetch item in");
      const res = await axios.get(
        "http://localhost:3000/homeserver/api/items",
        { params: { email: user.email, role: user.role } }
      );
      setItems(res.data);
    };
    fetchitems();
  }, []);
  return (
    <>
      <div className="inventory_top">
        <div className="inventory_top_left">
          <div className="inventory_category_selector">
            <span>Category | {categoryFilter ? categoryFilter : "All"}</span>
            <KeyboardArrowDownIcon className="inventory_icon" />
          </div>
          <div className="inventory_category_list">
            <ul>
              <Link to={"/inventory"} className="link">
                <li className="sidebarListItem" onClick={handleCategoryClicked}>
                  All
                </li>
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.name}
                  to={`/inventory/?cat=${c.name}`}
                  className="link"
                >
                  <li
                    className="sidebarListItem"
                    key={"c.name"}
                    onClick={handleCategoryClicked}
                  >
                    {c.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <Link className="link" to="/addItem">
          <button className="inventory_add_btn">+ Add Item</button>
        </Link>
      </div>
      <div className="inventory">
        <Items items={items} />
      </div>
    </>
  );
}
