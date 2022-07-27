import { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
   return (
      <div className="home">
        <h1> manage your home</h1>
        <span>Start your happy home managing with /our app name/</span>
      </div>
  );
}
