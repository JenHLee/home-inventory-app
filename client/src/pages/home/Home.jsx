import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
   return (
      <div className="home">
        <h1 className="home_h1">manage your home</h1>
        <span className="home_span">Start your happy home managing with HOME nVentory</span>
        <Link className="link" to="/signin">
        <button className="home_btn">Get Started</button>
        </Link>
        <div className="home_img_div">
          <div className="home_img1"></div>
          <div className="home_img2"></div>
        </div>
      </div>
  );
}
