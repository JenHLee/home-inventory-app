import "./item.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Item({ item }) {
  const { user } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  return (
    <>
      {user ? (
       
          <div className="item">
            <div className="item_info">
              <Link to={`/item/${item._id}`} className="link">
                <img
                  className="item_img"
                  src={PF + item.photo}
                  alt={item.title}
                />
              </Link>
                <div className="item_category_div">
                  <span className="item_category" key={item.category}>
                    {item.category}
                  </span>
                  {
                    user.role === 2 ? null :
                  
                    (<span className="item_email" key={item.email}>
                    {item.email}
                  </span>
                 )
                 }
                </div>
                <span className="item_title" key={item.title}>
                  {item.title}
                </span>
              <span className="item_price">{item.price}</span>
            </div>
          </div>
      ) : null}
    </>
  );
}
