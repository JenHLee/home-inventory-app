import { useEffect, useState } from "react";
import Items from "../../components/items/Items";
import "./inventory.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";
// import { useLocation } from "react-router";

export default function Home() {
  const [items, setItems] = useState([]);
  const { user } = useContext(Context);
  // const search  = useLocation();

  useEffect(() => {
    const fetchitems = async () => {
      console.log("fetch item in");
      const res = await axios.get(
        "http://localhost:3000/homeserver/api/items",
        { params: { email: user.email, role: user.role } }
      );
      // console.log(`${JSON.stringify(search)}`);
      setItems(res.data);
      console.log(JSON.stringify(res.data));
    };
    fetchitems();
  }, []);
  return (
    <>
      <div className="inventory">
        <Items items={items} />
      </div>
    </>
  );
}
