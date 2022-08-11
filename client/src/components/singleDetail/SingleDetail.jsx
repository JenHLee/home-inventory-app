import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import Context from "../../context/Context";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./singleDetail.css";
import Swal from "sweetalert2";
import CategoryList from "../categoryList/CategoryList";

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
  const [categories, setCategories] = useState([]);

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
    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, [path]); //[parameter]

  const fetchCategories = async () => {
    const res = await axios.get(
      "http://localhost:3000/homeserver/api/categories/"
    );
    return res.data;
  };

  const handleDelete = () => {
    try {
      axios.delete(`http://localhost:3000/homeserver/api/items/${item._id}`, {
        data: { email: user.email },
      });

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "Item is deleted in successfuly",
      });
      if (Toast.fire) {
        window.location.replace("/inventory");
      }
    } catch (err) {
      console.log(err);
    }
  }; //no need to use async, await

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/homeserver/api/items/${item._id}`,
        {
          email: user.email,
          category,
          title,
          price,
        }
      );
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
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
              <option>
                --------------------------------------------------------
              </option>
              <CategoryList categories={categories} />
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
              type="text"
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
              type="text"
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
