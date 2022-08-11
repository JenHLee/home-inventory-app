import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import Swal from "sweetalert2";

function Topbar() {
  const { user, dispatch } = useContext(Context);
  // 디스패치 ( dispatch )
  // 디스패치는 스토어의 내장 함수 중 하나로 리듀서에게 Action 을 발생하라고 시키는 것.
  // dispatch 함수는 dispatch(action) 이런 식으로 Action 을 인자로 넘긴다.
  const PF = "http://localhost:5000/images/";
  // console.log("user: " + JSON.stringify(user.data));

  const handleLogout = () => {
    // console.log("handleLogout in");
    dispatch({ type: "LOGOUT" });
    //LOGOUT이 액션
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Successfully logged out",
    });

    if (Toast.fire) {
      window.location.replace("/");
    }
  };

  return (
    <div className="top">
      <Link className="link" to="/">
        <img className="topLogo" src={"logo.png"} alt="logo" />
      </Link>
      <div className="topLeft"></div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem" id="listItemFirst">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem" id="listItemSecond">
            <Link className="link" to="/about">
              ABOUT US
            </Link>
          </li>
          {user ? (
            // 1 = systemAdmin, 3 = companyAdmin
            user.role === 1 || user.role === 3 ? (
              <>
                <li className="topListItem" id="listItemFourth">
                  <Link className="link" to="/admin/manageCategory">
                    CATEGORIES
                  </Link>
                </li>
                <li className="topListItem" id="listItemFifth">
                  <Link className="link" to="/admin/manageUser">
                    USERS
                  </Link>
                </li>
              </>
            ) : null
          ) : null}
          {user ? (
            <>
             <li className="topListItem" id="listItemThird">
                <Link className="link" to="/inventory">
                  INVENTORY
                </Link>
              </li>
            <li className="topListItem" id="listItemFourth">
              <span className="link" onClick={handleLogout}>
                LOGOUT
              </span>
            </li>
            </>
          ) : (
            <li className="topListItem" id="listItemLast">
              <Link className="link" to="/signin">
                SIGN IN
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          user.profilePic ? (
            <Link to="/settings">
              <img className="topImg" src={PF + user.profilePic} alt="" />
            </Link>
          ) : (
            <Link to="/settings">
              <img
                className="topImg"
                src={require("../../assets/img/defaultProfilePic.jpg")}
                alt=""
              />
            </Link>
          )
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/signup">
                SIGN UP
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}

export default Topbar;
