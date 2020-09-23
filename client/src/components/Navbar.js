import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div className='myNav'>
        <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div class='container-fluid'>
            <a class='navbar-brand' href='#'>
              CONCERTO
            </a>
            <li class='nav-item d-flex'>
              <a
                class='nav-link active text-white'
                aria-current='page'
                href='http://localhost:3000/'
              >
                SIGN OUT
              </a>
            </li>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
