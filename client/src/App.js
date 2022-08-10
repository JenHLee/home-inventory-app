import Topbar from "./components/topbar/Topbar";
import Settings from "./pages/settings/Settings";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Inventory from "./pages/inventory/Inventory";
import Single from "./pages/single/Single";
import ManageCategory from "./pages/admin/manageCategory/ManageCategory";
import ManageUser from "./pages/admin/manageUser/ManageUser";
import AddItem from "./components/addItem/AddItem";
import AddUser from "./components/addUser/AddUser";
import EditUser from "./components/editUser/EditUser";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// React-Router는 신규 페이지를 불러오지 않는 상황에서
// 각각의 url에 따라 선택된 데이터를 하나의 페이지에서 렌더링 해주는 라이브러리

import { useContext } from "react";
import { Context } from "./context/Context";

//global 지정
let systemAdmin = "";
let companyAdmin = "";
let regularUser = "";

function App() {
  const { user } = useContext(Context);
  //context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있음
  if (user) {
    if (user.role === 1){
      systemAdmin = user;
      // console.log("systemAdmin: " + JSON.stringify(systemAdmin));
    } else if (user.role === 3) {
      companyAdmin = user; 
      // console.log("companyAdmin: " + JSON.stringify(companyAdmin));
    } else {
      regularUser = user;
      // console.log("regularUser: " + JSON.stringify(regularUser));
    }
  }

  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/inventory"
          element={user ? <Inventory /> : <Signup />}
        />
        <Route path="/signup" element={user ? <Home /> : <Signup />} />
        <Route path="/signin" element={user ? <Home /> : <Signin />} />
        <Route path="/item/:itemId" element={user? <Single /> : <Signin />} />
        {/* <Route path="/inventory/:categoryName" element={user? <Inventory /> : <Signin />} /> */}
        <Route
          path="/addItem"
          element={regularUser ? <AddItem /> : <Signin />}
        />
        <Route
          path="/settings"
          element={regularUser ? <Settings /> : <Signup />}
        />
        {/* didn't set admin page yet */}
        <Route
          path="/admin/manageCategory"
          element={systemAdmin || companyAdmin ? <ManageCategory /> : <Signin />}
        />
        <Route
          path="/admin/manageUser"
          element={systemAdmin || companyAdmin  ? <ManageUser /> : <Signin />}
        />
        <Route
          path="/admin/manageUser/addUser"
          element={systemAdmin || companyAdmin  ? <AddUser /> : <Signin />}
        />
        <Route
          path="/admin/manageUser/editUser/:userId"
          element={systemAdmin || companyAdmin  ? <EditUser /> : <Signin />}
        />
      </Routes>
    </BrowserRouter> //need to be one div
  );
}

export default App;
