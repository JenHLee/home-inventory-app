import Topbar from "./components/topbar/Topbar";
import Settings from "./pages/settings/Settings";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Inventory from "./pages/inventory/Inventory";
import Single from "./pages/single/Single";

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
        <Route path="/inventory" element={user ? <Inventory /> : <Signup/ >} />      <Route path="/signup" element={user ? <Home /> : <Signup />} />
        <Route path="/signin" element={user ? <Home /> : <Signin />} />
        <Route path="/item/:itemId" element={<Single />}/>
        <Route path="/settings" element={user ? <Settings /> : <Signup />} />
      </Routes>
    </BrowserRouter> //need to be one div
  );
}

export default App;
