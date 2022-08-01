import "./settings.css";
import { useContext, useState } from "react";
import Context from "../../context/Context";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:3000/homeserver/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("e: " + e);
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
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
      const res = await axios.put(
        "http://localhost:3000/homeserver/api/users/" + user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settings_title_div">
        <span className="settings_title">Account Settings</span>
      </div>
      <div className="settings_div">
        <form className="settings_form" onSubmit={handleSubmit}>
          <div className="settings_pp">
            <label htmlFor="file_input">
              {file ? (
                <img
                  className="settings_pp_topImg"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
              ) : user.profilePic ? (
                <img
                  className="settings_pp_topImg"
                  src={PF + user.profilePic}
                  alt=""
                />
              ) : (
                <img
                  className="settings_pp_topImg"
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
          <div className="settings_input">
            <table className="settings_input_table">
              <tr>
                <td>
                  <label className="settings_label">First Name</label>
                  <input
                    type="text"
                    className="settings_input"
                    placeholder={user.firstname}
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </td>
                <td>
                  <label className="settings_label">Last Name</label>
                  <input
                    type="text"
                    className="settings_input"
                    placeholder={user.lastname}
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
                    placeholder={user.email}
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
              <span className="setting_msg">
                Account has been updated!
                <Link className="link" to="/">
                  <span className="setting_msg_gohome"> go home</span>
                </Link>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
