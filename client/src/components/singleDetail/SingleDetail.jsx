import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import Context from "../../context/Context";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./singleDetail.css";
//import "./singleDetail.css";

export default function SingleDetail() {
  const location = useLocation();
  const path = location.pathname.split("/")[2]; //to get the userId (/post/userId) => [1] : item , [2] : userId
  const PF = "http://localhost:5000/images/";
  const [item, setItem] = useState({});
  const { user } = useContext(Context);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      const res = await axios.get(
        "http://localhost:3000/homeserver/api/items/" + path
      );
      setItem(res.data);
      // console.log("res.data: " + JSON.stringify(res.data));
      setCategory(res.data.category);
      // console.log("category: " + res.data.category);
      setTitle(res.data.title);
      // console.log("title: " + res.data.title);
      setPrice(res.data.price);
      // console.log("price: " + res.data.price);
    };
    getItem();
  }, [path]); //[parameter]

  const handleDelete = () => {
    try {
      axios.delete(`http://localhost:3000/homeserver/api/items/${item._id}`, {
        data: { email: user.email },
      });
      window.location.replace("/inventory");
    } catch (err) {}
  }; //no need to use async, await

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/homeserver/api/items/${item._id}`, {
        email: user.email,
        category,
        title,
        price,
      });
      //window.location.reload();
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singleDetail">
      <form className="singleDetail_form">
        <div className="singleDetail_img_div">
          {item.photo && (
            <img
              className="singleDetail_item_img"
              src={PF + item.photo}
              alt={item.title}
            />
          )}
        </div>
        {updateMode ? (
          <div className="singleDetail_input_div">
            <label className="singleDetail_input">Category</label>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option>{category}</option>
              <option>--------------------------------------------------------</option>
              <option value={"kitchen"}>kitchen</option>
              <option value={"bathroom"}>bathroom</option>
              <option value={"living room"}>living room</option>
              <option value={"basement"}>basement</option>
              <option value={"garage"}>garage</option>
              <option value={"office"}>office</option>
              <option value={"utility room"}>utility room</option>
              <option value={"storage"}>storage</option>
              <option value={"other"}>other</option>
            </select>
            <label className="single_detail_title">Title</label>
            <input
              type="text"
              value={title}
              className="singleDetail_input"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="singleDetail_input">Price</label>
            <input
              type="number"
              className="singleDetail_input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="singleDetail_btn_div">
              <button
                className="singleDetail_btn_update"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className="singleDetail_input_div">
            <label className="singleDetail_input">Category</label>
            <input
              type="text"
              className="singleDetail_input"
              value={category}
              disabled
            />
            <label className="single_detail_title">Title</label>
            <input
              type="text"
              placeholder="Item title"
              className="singleDetail_input"
              value={title}
              disabled
            />
            <label className="singleDetail_input">Price</label>
            <input
              type="number"
              className="singleDetail_input"
              value={price}
              disabled
            />
            <div className="singleDetail_icon_div">
              <EditIcon
                className="singleDetail_icon"
                id="singleDetail_icon_edit"
                onClick={() => setUpdateMode(true)}
              />
              <DeleteIcon
                className="singleDetail_icon"
                id="singleDetail_icon_delete"
                onClick={handleDelete}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
