import Item from "../item/Item";
import "./items.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";

export default function Items({ items }) {
  return (
    <>
      <div className="items_top">
        <div className="item_top_left">
          <span className="items_category_selector">Category | All </span>
          <KeyboardArrowDownIcon className="items_icon" />
        </div>
        <Link className="link" to="/addItem">
          <button className="items_add_btn">+ Add Item</button>
        </Link>
      </div>
      <div className="items">
        {items.map((i) => (
          <Item key={i._id} item={i} />
        ))}
      </div>
    </>
  );
}
