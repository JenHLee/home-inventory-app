import { useEffect, useState } from "react";
import Items from "../../components/items/Items";
import "./inventory.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

export default function Home() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useContext(Context);

  const fetchCategories = async () => {
    const res = await axios.get(
      "http://localhost:3000/homeserver/api/categories/"
    );
    return res.data;
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
        { params: { email: user.email, role: user.role} }
      );
      // console.log(`${JSON.stringify(search)}`);
      setItems(res.data);
      fetchCategories().then((data) => {
        setCategories(data);
      });
    };
    fetchitems();
  }, []);
  return (
    <>
      <div className="inventory_top">
        <div className="inventory_top_left">
          <div className="inventory_category_selector">
            <span>Category | All ▼</span>
          </div>
          <div className="inventory_category_list">
            <ul className="inventory_ul">
              {/* {categories.map((c) => (
                <li>{c.name}</li>
              ))} */}

              {categories.map((c) => (
                <Link key={c.name} to={`/?cat=${c.name}`} className="link">
                  <li className="inventory_li" key={"c.name"}>
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
