import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
export const Header = () => {
  return (
    <div id="main-header">
      <Navbar color="dark" dark>
        <NavbarBrand href="/">Who is next</NavbarBrand>
      </Navbar>
    </div>
  );
};
