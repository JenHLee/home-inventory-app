import "./home.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Home() {
  const { user, dispatch } = useContext(Context);
  return (
    <div className="home">
      <h1 className="home_h1">manage your home</h1>
      <span className="home_span">
        Start your happy home managing with HOME nVentory
      </span>
      {user ? null : (
        <Link className="link" to="/signin">
          <button className="home_btn">Get Started</button>
        </Link>
      )}
      <div className="home_img_div">
        <div className="home_img1"></div>
        <div className="home_img2"></div>
      </div>
    </div>
  );
}
