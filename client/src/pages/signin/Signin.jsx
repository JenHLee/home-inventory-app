import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./signin.css";

export default function Signin() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    console.log("e:" + JSON.stringify(e.data));
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:3000/homeserver/api/auth/signin",
        {
          email: userRef.current.value,
          password: passwordRef.current.value,
        }
      );
      console.log("user status: " + JSON.stringify(res.data.status));
      console.log("email/password: " + JSON.stringify(res.data));

      let userState = JSON.stringify(res.data.status);
      console.log("userState: " + userState);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

    } catch (err) {
      setError(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="signin">
      <div className="signin_div">
        <form className="signin_form" onSubmit={handleSubmit}>
          <span className="signin_title">Welcome back!</span>
          <span className="signin_span">
            If you don't have an account?
            <Link className="link" to="/signup">
              <span className="signin_signup_txt"> Sign up</span>
            </Link>
          </span>
          <label>Email</label>
          <input
            key="{userRef}"
            type="text"
            className="signin_input"
            placeholder="Enter your email..."
            ref={userRef}
          />
          <label>Password</label>
          <input
            key="{passwordRef}"
            type="password"
            className="signin_input"
            placeholder="Enter your password..."
            ref={passwordRef}
          />
          <button className="signin_btn" type="submit" disabled={isFetching}>
            SIGN IN
          </button>
        </form>
        {error && <span className="error_msg">Your account is inactive</span>}
      </div>
      <div className="signin_img"></div>
    </div>
  );
}
