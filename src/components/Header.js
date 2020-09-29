import logo from "../images/header-logo.png";
import React from "react";

function Header() {
    return (
        <header className="header">
            <img  className="header__logo" src={logo} alt="Место(Россия)" />
        </header>
    )
}

export default Header