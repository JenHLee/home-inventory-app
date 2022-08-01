import Topbar from "./components/topbar/Topbar";
import Settings from "./pages/settings/Settings";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Inventory from "./pages/inventory/Inventory";
import Single from "./pages/single/Single";
import ManageCategory from './pages/admin/manageCategory';
import ManageUser from './pages/admin/ManageUser';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import ManageUser from "./pages/admin/manageUser/ManageUser";

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
<<<<<<< HEAD
        <Route path="/admin/manageUser" element={<ManageUser />} />
=======
        {/* didn't set admin page yet */}
        <Route path="/admin/manageCategory" element={<ManageCategory/>}/>
        <Route path="/admin/manageUser" element={<ManageUser/>}/>

>>>>>>> origin
      </Routes>
    </BrowserRouter> //need to be one div
  );
}

export default App;
