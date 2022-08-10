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
  // const search  = useLocation();

  useEffect(() => {
    const fetchitems = async () => {
      console.log("fetch item in");
      const res = await axios.get(
        "http://localhost:3000/homeserver/api/items",
        { params: { email: user.email, role: user.role } }
      );
      // console.log(`${JSON.stringify(search)}`);
      setItems(res.data);
      console.log(JSON.stringify(res.data));
    };
    fetchitems();
  }, []);
  return (
    <>
      <div className="inventory_top">
        <div className="inventory_top_left">
          <span className="inventory_category_selector">Category | All </span>
          <KeyboardArrowDownIcon className="inventory_icon" />
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
