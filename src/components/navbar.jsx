import React from "react";

// Stateless Functional Component
const NavBar = ({ totalCounters}) => {
    console.log("narbar - rendered");

    return (
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="{#}">
                Navbar{" "}
                Navbar <span className="badge badge-pill badge-secondary">
                {totalCounters}
            </span>
            </a>
        </nav>
    );
}


export default NavBar;