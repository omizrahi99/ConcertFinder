import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";

const Main = () => {
  return (
    <Switch>
      {" "}
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={LandingPage}></Route>
      <Route exact path='/main' component={MainPage}></Route>
    </Switch>
  );
};

export default Main;
