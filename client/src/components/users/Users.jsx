import React from "react";
import User from "../user/User";
import "./users.css";

export default function Users({ users }) {
  return (
    <>
      <div className="users">
        {users.map((u) => (
          <User key={u._id} userprop={u} />
        ))}
      </div>
    </>
  );
}
