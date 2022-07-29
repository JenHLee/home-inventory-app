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
      const res = await axios.get("/items" + search);
      setItems(res.data);
    };
    fetchitems();
  }, [search]);
  return (
    <>
      <div className="home">
        <Items items={items} />
      </div>
    </>
  );
}
