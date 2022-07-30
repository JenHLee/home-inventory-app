import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Context from "../../context/Context";
//import "./singleDetail.css";

export default function SingleDetail() {
    const location = useLocation();
    const path = location.pathname.split("/")[2]; //to get the userId (/post/userId) => [1] : item , [2] : userId
    const PF = "http://localhost:5000/images/";
    const [item, setItem] = useState({});
    const { user } = useContext(Context);
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getItem = async () => {
            const res = await axios.get("/item/" + path);
            setItem(res.data);
            setCategory(res.data.category);
            setTitle(res.data.title);
            setPrice(res.data.price);
        };
        getItem();
    }, [path]); //[parameter]


    const handleDelete = () => {
        try {
            axios.delete(`/item/${item._id}`, {
                data: { email: user.email },
            });
            window.location.replace("/");
        } catch (err) { }
    }; //no need to use async, await 

    const handleUpdate = async () => {
        try {
            await axios.put(`/item/${item._id}`, {
                email: user.email,
                category,
                title,
                price,
            });
            //window.location.reload();
            setUpdateMode(false); 
        } catch (err) { }
    };
    return (
        <div className="single">
            <div className="single_div">
                {item.photo && (
                    <img
                        className="single_item_img"
                        src={PF + item.photo}
                        alt="single_item_img"
                    />
                )}
                {
                    updateMode ? (<input type="text"
                        value={title}
                        className="single_input"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    ) : (
                        <h1 className="single_title">
                            {title}
                            {item.email === user?.email && (
                                <div className="single_item_edit">
                                    <i className="single_item_icon fa-solid fa-pen-to-square"
                                        id="single_item_icon1"
                                        onClick={() => setUpdateMode(true)}>
                                    </i>
                                    <i className="single_item_icon fa-solid fa-trash-can"
                                        id="single_item_icon2"
                                        onClick={handleDelete}>
                                    </i>
                                </div>
                            )}
                        </h1>
                    )
                }
                {updateMode ? (
                    <input
                        className="single_item_input"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />
                ) : (
                    <p className="single_item_price">{price}</p>
                )}
                {updateMode && (
                    <button className="single_item_btn" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    );
}