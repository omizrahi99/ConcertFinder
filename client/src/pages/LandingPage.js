import React, { Component } from "react";
import "../LandingPage.css";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  render() {
    return (
      <div className='landing-page'>
        <header class='header'>
          <a href='http://localhost:3000/' class='header__logo-box'>
            CONCERTO
          </a>
          <div class='header__text-box'>
            <h1 class='heading-primary'>
              <span class='heading-primary--main'>CONCERTS</span>
              <span class='heading-primary--sub'>
                where everyone speaks one language
              </span>
            </h1>
            <a
              href='http://localhost:8888/login'
              class='btn btn--white btn--animated btn-'
            >
              Get Started
            </a>
          </div>
        </header>
      </div>
    );
  }
}

export default LandingPage;
