import React from "react";
import "./editUser.css";
import { useContext, useState } from "react";
import Context from "../../context/Context";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function EditUser() {
  const location = useLocation();
  const { userprop } = location.state;
  // console.log(`${JSON.stringify(userprop)}`);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:3000/homeserver/images/";
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("e: " + JSON.stringify(e.data));
    // console.log("userprop.email: " + userprop.email);
    // console.log("userprop._id: " + userprop._id);
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      adminRole: user.role,
      userId: userprop._id,
      firstname,
      lastname,
      email,
      password,
      status,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name; //create new file name using date (random)
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("http://localhost:3000/homeserver/api/upload", data);
      } catch (err) {
        console.log("err: " + err);
      }
    }
    try {
      console.log("try in");
      const res = await axios.put(
        "http://localhost:3000/homeserver/api/users/" + userprop._id,
        updatedUser
      );
      console.log("res" + JSON.stringify(res.data));

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
        title: "User account is updated",
      });

      if (Toast.fire) {
        window.location.replace("/admin/manageUser");
      }

      // console.log("res : " + JSON.stringify(res.data));
      // dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      console.log("catch in");
      console.log("error: " + err);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="editUser">
      <div className="editUser_title_div">
        <span className="editUser_title">
          {userprop.firstname} {userprop.lastname}'s Account
        </span>
      </div>
      <div className="editUser_div">
        <form className="editUser_form" onSubmit={handleSubmit}>
          <div className="editUser_pp">
            <label htmlFor="file_input">
              {file ? (
                <img
                  className="editUser_pp_topImg"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
              ) : userprop.profilePic ? (
                <img
                  className="editUser_pp_topImg"
                  src={PF + userprop.profilePic}
                  alt=""
                />
              ) : (
                <img
                  className="editUser_pp_topImg"
                  src={require("../../assets/img/defaultProfilePic.jpg")}
                  alt=""
                />
              )}
            </label>
            <input
              type="file"
              id="file_input"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="editUser_input">
            <table className="editUser_input_table">
              <tr>
                <td>
                  <label className="editUser_label">First Name</label>
                  <input
                    type="text"
                    className="editUser_input"
                    placeholder={userprop.firstname}
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </td>
                <td>
                  <label className="editUser_label">Last Name</label>
                  <input
                    type="text"
                    className="editUser_input"
                    placeholder={userprop.lastname}
                    required
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="editUser_label">Email</label>
                  <input
                    type="email"
                    className="editUser_input"
                    required
                    placeholder={userprop.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
                <td>
                  <label className="editUser_label">Password</label>
                  <input
                    type="password"
                    className="editUser_input"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="editUser_label">Status</label>
                  <div className="editUser_status_div">
                    <input
                      className="editUser_input_status"
                      type="radio"
                      name="status"
                      value="active"
                      required
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <label className="editUser_label_status">Active</label>
                    <input
                      className="editUser_input_status"
                      type="radio"
                      name="status"
                      value="inactive"
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <label className="editUser_label_status">InActive</label>
                  </div>
                </td>
              </tr>
            </table>
            <div className="editUser_btn_div">
              <button
                className="editUser_btn"
                id="editUser_btn_update"
                type="submit"
              >
                Update
              </button>
              <Link className="link" to="/">
                <button
                  className="editUser_btn"
                  id="editUser_btn_cancel"
                  type="submit"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
