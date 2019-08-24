import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
export const Header = () => {
  return (
    <div id="main-header">
      <Navbar color="primary" dark>
        <NavbarBrand href="/">WHO IS NEXT</NavbarBrand>
      </Navbar>
    </div>
  );
};
