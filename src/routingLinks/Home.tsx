import React from "react";
import { Link } from "react-router-dom";
import HomeStyles from "./Home.module.css";
import { useUsersContext } from "../contexts/UserContext";

export const Home = () => {
  const { AvatarWrapper } = useUsersContext();
  return (
    <header>
      <AvatarWrapper></AvatarWrapper>
      <nav>
        <ul className={HomeStyles.menuItems}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/clients">Clients</Link>
          </li>
          <li>
            <Link to="/clients/1">Single client</Link>
          </li>
          <li>
            <Link to="/clients/add">Add clients</Link>
          </li>
          <li>
            <Link to="/clients/1/edit">Edit clients</Link>
          </li>

          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/orders/1">Single order</Link>
          </li>
          <li>
            <Link to="/orders/add">Add order</Link>
          </li>
          <li>
            <Link to="/invoices">Invoices</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      {/* <AsideMenu /> */}
    </header>
  );
};
