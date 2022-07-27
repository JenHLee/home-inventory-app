import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./signup.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    //console.log("handlesubmit function in before event prevent");
    e.preventDefault();
    //console.log("handlesubmit function in after event prevent");
    //console.log("e: " + e);
    setError(false);
    console.log("before try/catch: " + username, email, password);
    try {
      console.log("try in");
      const res = await axios.post("/auth/signup", {
        username,
        email,
        password,
      });
      console.log(res);
      console.log("after try: " + username, email, password);
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
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Last Name</label>
        <input
          type="text"
          className="signup_input"
          placeholder="Enter your lasat name..."
          onChange={(e) => setUsername(e.target.value)}
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
      </div>
      {error && <span>Something went wrong</span>}
    </div>

  );
}
