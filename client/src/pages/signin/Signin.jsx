import axios from "axios";
import { user, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./signin.css";

export default function Signin() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    console.log("e:" + e);
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/signin", {
        email: userRef.current.value,
        password: passwordRef.current.value,
      });
      console.log("email/password" + res);
      
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  console.log("user: " + user);
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
          <input key="{userRef}" type="text" className="signin_input" placeholder="Enter your email..." ref={userRef} />
          <label>Password</label>
          <input key="{passwordRef}" type="password" className="signin_input" placeholder="Enter your password..." ref={passwordRef} />
          <button className="signin_btn" type="submit" disabled={isFetching}>
            SIGN IN
          </button>
        </form>
      </div>
      <div className="signin_img"></div>
    </div>
  );
}
