import { useEffect, useState } from "react";
import Items from "../../components/items/Items";
import "./inventory.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [items, setItems] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchitems = async () => {
      console.log("fetch item in");
      const res = await axios.get("http://localhost:3000/homeserver/api/items" + search);
      setItems(res.data);
    };
    fetchitems();
  }, [search]);
  return (
    <>
      <div className="inventory">
        <Items items={items} />
      </div>
    </>
  );
}
