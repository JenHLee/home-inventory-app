import React from "react";
import "./about.css";

function About() {
  return (
    <div className="about">
      <h1>
        Manage your<br></br>sweet home
      </h1>
      <table>
        <tr>
          <th>Mailing Address</th>
          <th>Email Address</th>
          <th>Phone Number</th>
        </tr>
        <tr>
          <td>123 Sait St. Calgary, <br></br> AB, Canada A1B C2D</td>
          <td>office@homenventory.com</td>
          <td>587-987-HOME</td>
        </tr>
      </table>
    </div>
  );
}

export default About;
