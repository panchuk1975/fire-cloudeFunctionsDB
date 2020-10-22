import React, { useContext, useState, memo } from "react";
import { NavLink } from "react-router-dom";
import fire from "../config/Fire";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import "../CSS/NavbarStyle.css";

export const Navbar = memo(() => {
  const [showBtn, setBtn] = useState("item");

  let logout = () => {
    fire.auth().signOut();
  };

  let setClass = () => {
    if (showBtn === "showBtn") {
      setBtn("item");
    } else {
      setBtn("showBtn");
    }
    return showBtn;
  };
  const { create, changeCreate } = useContext(FirebaseContext);
  return (
   
    <nav className="navbar navbar-dark navbar-expand-lg bg-secondary">
      <div className="navbar-brand">TehSupport</div>
      <ul className="navbar-nav">
        <li className="nav-item active">
          <NavLink className="nav-link" to="/home">
            Головна
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">
            Info
          </NavLink>
        </li>
        <li className="nav-item" onClick={changeCreate}>
          <NavLink className="nav-link" to="/home" exact>
            {!create && "Нове авто"} {create && "Закрити вікно"}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/home" onClick={logout}>
            Вийти
          </NavLink>
        </li>
      </ul>
    </nav>
  );
});
