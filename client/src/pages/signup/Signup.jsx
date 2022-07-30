import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./signup.css";

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit function in after event prevent");
    console.log("e: " + e); // [object object]
    //  const obj = JSON.stringify(e);
    // alert("e: " + JSON.parse(obj));
    setError(false);
    console.log("before try/catch: " + firstname, lastname, email, password);
    try {
      console.log("try in");
      const res = await axios.post("/auth/signup", {
        firstname,
        lastname,
        email,
        password,
      });
      console.log("res: " + res);
      console.log("after try: " + firstname, lastname, email, password);
      res.data && window.location.replace("/signin");
    } catch (err) {
      console.log("catch in");
      setError(true);
    }
  };
  return (
    <div className="signup">
      <div className="signup_img"></div>

      <div className="signup_div">
        <form className="signup_form" onSubmit={handleSubmit}>
          <span className="signup_title">Sign Up</span>
          <span className="signup_span">
            Already have an account?
            <Link className="link" to="/signin">
              <span className="signup_signin_txt"> Sign in</span>
            </Link>
          </span>
          <label>First Name</label>
          <input
            type="text"
            className="signup_input"
            placeholder="Enter your first name..."
            onChange={(e) => setFirstname(e.target.value)}
          />
          <label>Last Name</label>
          <input
            type="text"
            className="signup_input"
            placeholder="Enter your lasat name..."
            onChange={(e) => setLastname(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            className="signup_input"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="signup_input"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="signup_btn" type="submit">
            SIGN UP
          </button>
        </form>
      {error && <span className="error_msg">Something went wrong</span>}
      </div>
    </div>
  );
}
