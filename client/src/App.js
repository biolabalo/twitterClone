import React, { Fragment, useEffect, Suspense, lazy } from "react";
import Index from "./Components/Auth/Home";
import Home from "./Components/Home";
import Login from "./Components/Auth/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {

  return (
    <div className="App"
    style={ window.location.pathname.split("/").pop() === "login" ? {background:"#e6ecf0"}: {background:""}}
    >
       <Router>
      < Switch>
      < Route exact path="/" component={Index} />
      < Route exact path="/home" component={Home} />
      < Route exact path="/Login" component={Login}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
