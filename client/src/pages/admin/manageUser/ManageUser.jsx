import "./manageUser.css";
import Users from "../../../components/users/Users";
import axios from "axios";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        "http://localhost:3000/homeserver/api/users/" + search
      );
      setUsers(res.data);
      console.log(`ManageUser.jsx: useEffect: ${res.data}`);
    };
    fetchUsers();
  }, [search]);

  return (
    <>
      <div className="home">
        <div className="manage_user_top">
          <h1 className="manage_user_h1">Manage Users</h1>
          <div className="user_add_btn_container">
            <button className="user_add_btn">Add User</button>
          </div>
        </div>
        <Users users={users} />
      </div>
    </>
  );
}
