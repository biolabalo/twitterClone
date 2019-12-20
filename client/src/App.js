import React, { Fragment, useEffect, Suspense, lazy } from "react";
import Index from "./Components/Auth/Home";
import Home from "./Components/Home";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  let style;

  switch (window.location.pathname.split("/").pop()) {
    case "login":
      style = { background: "#e6ecf0" };
      break;
    case "signup":
      style = { background: "rgb(21, 32, 43)" };
      break;
    default:
      style = { background: "white !important" };
  }

  return (
    <div className="App" style={style}>
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/i/flow/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
