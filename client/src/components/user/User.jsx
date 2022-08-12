import React from "react";
import "./user.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function User({ userprop }) {
  const { user } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  // console.log(`User.jsx 's user ${user.firstname}`);
  // console.log(`User.jsx 's userprop ${userprop.firstname}`);

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      // console.log("userprop.email: " + userprop.email);
      // console.log("userprop._id: " + userprop._id);
      axios.delete(
        `http://localhost:3000/homeserver/api/users/${userprop._id}`,
        {
          data: { userId: userprop._id },
        }
      );
      
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
      title: "User is deleted in successfuly",
    });

      window.location.replace("/admin/manageUser");
    } catch (err) {
      console.log("err : " + err);
    }
  };
  return (
    <>
      {user ? (
        <div className="user">
          <img
            className="user_img"
            src={PF + userprop.profilePic}
            alt={userprop.firstname}
          />
          <div className="user_info_container">
            <span className="user_name">
              {userprop.firstname} {userprop.lastname}
            </span>
            <span className="user_email">{userprop.email}</span>
            <span className="user_status">{userprop.status}</span>
          </div>
          <div className="manage_icon">
            <Link
              className="link"
              to={"/admin/manageUser/editUser/" + userprop._id}
              state={{ userprop }}
            >
              <EditIcon
                className="manage_icon_edit"
                key={userprop._id}
                userprop={userprop}
              />
            </Link>
            <DeleteIcon className="manage_icon_delete" onClick={handleDelete} />
          </div>
        </div>
      ) : null}
    </>
  );
}
