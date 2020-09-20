import React, { Component } from "react";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <h1>This will be the landing page</h1>
        <a href='http://localhost:8888'>Log In</a>
      </div>
    );
  }
}

export default LandingPage;
