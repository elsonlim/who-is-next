import React from "react";
import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <div id="main-header">
      <Navbar color="primary" dark>
        <Link className="header-link--title" to="/">
          WHO IS NEXT
        </Link>
        <Link className="header-link--sideText" data-testid="side" to="/pairs">
          Pairs
        </Link>
      </Navbar>
    </div>
  );
};
