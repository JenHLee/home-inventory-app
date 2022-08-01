import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./addUser.css";

export default function AddUser() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit function in after event prevent");
    console.log("e: " + JSON.stringify(e.data));
    setError(false);
    console.log("before try/catch: " + firstname, lastname, email, password);
    try {
      console.log("try in");
      const res = await axios.post(
        "http://localhost:3000/homeserver/api/auth/signup",
        {
          firstname,
          lastname,
          email,
          password,
          status,
        }
      );
      console.log("res: " + res);
      console.log("after try: " + firstname, lastname, email, password, status);
      alert("User is created!");
      res.data && window.location.replace("/admin/manageUser");
    } catch (err) {
      console.log("catch in");
      console.log(err);
      setError(true);
    }
  };
  return (
    <div className="addUser">
      <div className="addUser_title_div">
        <span className="addUser_title">Add User</span>
      </div>
      <div className="addUser_div">
        <form className="addUser_form" onSubmit={handleSubmit}>
          <div className="addUser_pp">
            <label htmlFor="file_input">
              <img
                className="addUser_pp_topImg"
                src={require("../../assets/img/defaultProfilePic.jpg")}
                alt=""
              />
            </label>
          </div>
          <div className="addUser_input">
            <table className="addUser_input_table">
              <tr>
                <td>
                  <label className="addUser_label">First Name</label>
                  <input
                    type="text"
                    className="addUser_input"
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </td>
                <td>
                  <label className="addUser_label">Last Name</label>
                  <input
                    type="text"
                    className="addUser_input"
                    required
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="addUser_label">Email</label>
                  <input
                    type="email"
                    className="addUser_input"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
                <td>
                  <label className="addUser_label">Password</label>
                  <input
                    type="password"
                    className="addUser_input"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="addUser_label">Status</label>
                  <div className="addUser_status_div">
                    <input
                      className="addUser_input_status"
                      type="radio"
                      name="status"
                      value="active"
                      required
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <label className="addUser_label_status">Active</label>
                    <input
                      className="addUser_input_status"
                      type="radio"
                      name="status"
                      value="inactive"
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <label className="addUser_label_status">InActive</label>
                  </div>
                </td>
              </tr>
            </table>
            <div className="addUser_btn_div">
              <button
                className="addUser_btn"
                id="addUser_btn_update"
                type="submit"
              >
                Create
              </button>
              <Link className="link" to="/">
                <button
                  className="addUser_btn"
                  id="addUser_btn_cancel"
                  type="submit"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
        {error && <span className="error_msg">Email is already taken</span>}
      </div>
    </div>
  );
}