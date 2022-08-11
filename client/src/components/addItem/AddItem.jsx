import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import "./addItem.css";
import Swal from "sweetalert2";

export default function AddItem() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  // const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("e: " + JSON.stringify(e.data));
    const newItem = {
      category,
      title,
      price,
      email: user.email,
      role: user.role,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name; //create new file name using date (random)
      data.append("name", filename);
      data.append("file", file);
      newItem.photo = filename;
      try {
        await axios.post("http://localhost:3000/homeserver/api/upload", data);
        const res = await axios.post(
          "http://localhost:3000/homeserver/api/items/",
          newItem
        );
        // console.log("res: " + res);
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
          title: "New item is added in successfuly",
        });
  
        if (Toast.fire) {
          window.location.replace("/inventory");
        };
      } catch (err) {
        console.log(err);
      }
      // console.log("data: " + data);
      
    } else {
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
        icon: "error",
        title: "Item's photo is required!",
      });      
    }
  };

  return (
    <div className="additem">
      <form className="additem_form" onSubmit={handleSubmit}>
        <div className="additem_img_div">
          <label htmlFor="file_input">
            {file ? (
              <img
                className="additem_img"
                src={URL.createObjectURL(file)}
                alt=""
              />
            ) : (
              <img
                className="additem_img"
                src={require("../../assets/img/default_item_img1.png")}
                alt=""
              />
            )}
          </label>
          <input
            type="file"
            id="file_input"
            name="file_input"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="additem_input_div">
          <label className="additem_input">Category</label>
          <select required onChange={(e) => setCategory(e.target.value)}>
            <option>{category}</option>
            <option>
              --------------------------------------------------------
            </option>
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
          <label className="additem_input">Title</label>
          <input
            type="text"
            className="additem_input"
            autoFocus={true}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="additem_input">Price</label>
          <input
            type="text"
            // step="0.01"
            // pattern="^\d+(?:\.\d{1,2})?$"
            placeholder="0.00"
            required
            className="additem_input"
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="additem_btn_div">
            <button
              className="additem_btn"
              id="additem_btn_submit"
              type="submit"
            >
              Submit
            </button>
            <Link className="link" to="/">
              <button className="additem_btn" id="additem_btn_cancel">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
