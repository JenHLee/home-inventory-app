import "./item.css";
import { Link } from "react-router-dom";

export default function item({ item }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="item">
      <img
        className="item_img"
        src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
        alt=""
      />
      <div className="item_info">
        <span className="item_category">Kitchen</span>
        <span className="item_title">Island Table</span>
        <span className="item_price">$500.00</span>
      </div>
    </div>
  );
}
