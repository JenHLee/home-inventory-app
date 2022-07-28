import Topbar from "./components/topbar/Topbar";
import Settings from "./pages/settings/Settings";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Inventory from "./pages/inventory/Inventory";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter> //need to be one div
  );
}

export default App;
