import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import "./addUser.css";

export default function AddUser() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {};

  const setFile = () => {};

  return (
    <div className="settings">
      <div className="settings_title_div">
        <span className="settings_title">Add User</span>
      </div>
      <div className="settings_div">
        <form className="settings_form" onSubmit={handleSubmit}>
          <div className="settings_pp">
            <label htmlFor="file_input">
              <img
                className="settings_pp_topImg"
                src={require("../../assets/img/defaultProfilePic.jpg")}
                alt=""
              />
            </label>
            <input
              type="file"
              id="file_input"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="settings_input">
            <table className="settings_input_table">
              <tr>
                <td>
                  <label className="settings_label">First Name</label>
                  <input
                    type="text"
                    className="settings_input"
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </td>
                <td>
                  <label className="settings_label">Last Name</label>
                  <input
                    type="text"
                    className="settings_input"
                    required
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="settings_label">Email</label>
                  <input
                    type="email"
                    className="settings_input"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
                <td>
                  <label className="settings_label">Password</label>
                  <input
                    type="password"
                    className="settings_input"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="settings_label">Status</label>
                  <div className="settings_status_div">
                    <input
                      className="settings_input_status"
                      type="radio"
                      name="status"
                      value="active"
                      required
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <label className="settings_label_status">Active</label>
                    <input
                      className="settings_input_status"
                      type="radio"
                      name="status"
                      value="inactive"
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <label className="settings_label_status">InActive</label>
                  </div>
                </td>
              </tr>
            </table>
            <div className="settings_btn_div">
              <button
                className="settings_btn"
                id="settings_btn_update"
                type="submit"
              >
                Update
              </button>
              <Link className="link" to="/">
                <button
                  className="settings_btn"
                  id="settings_btn_cancel"
                  type="submit"
                >
                  Cancel
                </button>
              </Link>
            </div>
            {success && (
              <span className="setting_msg">Account has been created!</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
