import React, { Fragment, useEffect, Suspense, lazy } from "react";
import Login from "./Components/Auth/Login/Login";
 import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <div className="App">
       <Router>
      < Switch>
      < Route exact path="/" component={Login} />
      < Route exact path="/home" component={Home} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
