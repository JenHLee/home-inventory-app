import "./settings.css";
import { useContext, useState } from "react";
import Context from "../../context/Context";
import axios from "axios";

export default function Settings() {
    const [file, setFile] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [success, setSuccess] = useState(false);
    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/";

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };


    return (
        <div className="settings">
            <div className="settingsWrapper">

                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">✦ Update Your Account ✦</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        {file ? (
                            <img className="topImg"
                                src={URL.createObjectURL(file)}
                                alt="" />
                        ) : user.profilePic ? (

                            <img className="topImg"
                                src={PF + user.profilePic}
                                alt="" />
                        ) : (
                            <img className="topImg"
                                src={require("../../assets/img/defaultProfilePic.jpg")}
                                alt="" />
                        )}

                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon fa-solid fa-circle-user"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <label>First Name</label>
                    <input type="text" placeholder={user.firstname} onChange={(e) => setFirstname(e.target.value)} />
                    <label>Last Name</label>
                    <input type="text" placeholder={user.lastname} onChange={(e) => setLastname(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    <label>Status</label>
                    <input type="radio" placeholder={user.status} onChange={(e) => setStatus(e.target.value)} />
                    <button className="settingsSubmit" type="submit">
                        Update
                    </button>
                    {success && <span className="settingMessage">Profile has been updated...</span>}
                </form>
            </div>
        </div>
    )
}