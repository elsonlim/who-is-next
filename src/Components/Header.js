import React from "react";
import { Navbar } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const SideLink = (props) => {
  const getClassName = (isActive) => {
    return isActive ? "header-link--sideText-active" : "header-link--sideText";
  };
  return (
    <NavLink exact className={getClassName} {...props}>
      {props.children}
    </NavLink>
  );
};

export const Header = () => {
  return (
    <div id="main-header">
      <Navbar color="primary" dark>
        <Link className="header-link--title" to="/">
          WHO IS NEXT
        </Link>
        <div data-testid="side">
          <SideLink to="/">Who is next</SideLink>
          <SideLink to="/pairs">Pairs</SideLink>
          <SideLink to="/speedback">Speedback</SideLink>
        </div>
      </Navbar>
    </div>
  );
};
