import Item from "../item/Item";
import "./items.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Items({ items }) {
  return (
    <>
      <div className="items_top">
        <div className="item_top_left">
          <span className="items_category_selector">Category | All </span>
          <KeyboardArrowDownIcon className="items_icon" />
        </div>
        <button className="items_add_btn">+ Add Item</button>
      </div>
      <div className="items">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </>
  );
}
