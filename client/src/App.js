import React, { useEffect, useState } from "react";
import Index from "./Components/Auth/Home";
import Home from "./Components/Home";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import Isloading  from "./Components/404/isLoading";
import VerifyModal from "./Components/Auth/SignUp/verifyModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "./firebaseConfig";
import NetworkError from "./Components/404/NetworkError";
import NotFoundPage from "./Components/404/NotFoundPage";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

const db = firebase.firestore();
const auth = firebase.auth();

function App() {

  document.getElementById("root").style.background = "#000";

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setAuthentication] = useState(false);
  const [isNetworkError, setNetworkErrorStatus] = useState(false);

  useEffect(() => {
    if (navigator.onLine) {
      setNetworkErrorStatus(false);
      setIsLoading(true);
      auth.onAuthStateChanged(function(user) {
        if (user) {
          setIsLoading(false);
          setAuthentication(true);
       db.collection("user")
      .doc(`${firebase.auth().currentUser.email}`)
      .onSnapshot(function(doc) {
        if (doc.exists) {
          document.getElementById("root").style.background = doc.data().userTheme.backgroundColor;
        
        } else {
        
        }
      });
        } else {
          setIsLoading(false);
          setAuthentication(false);
         return  <Redirect to="/login" />
        }
      })
      return () => {};
    } else {
      setNetworkErrorStatus(true)
    }
  }, []);


  let style;

  // switch (window.location.pathname.split("/").pop()) {
  //   case "login":
  //     style = { background: "#e6ecf0" };
  //     break;
  //   case "signup":
  //     style = { background: "rgb(21, 32, 43)" };
  //     break;
  //   case "verify":
  //     style = { background: "rgb(21, 32, 43)" };
  //     break;
  //   default:
  //     style = { background: "white !important" };
  // }

if(isNetworkError){
  return <NetworkError />
}
   

if(isLoading){
  return < Isloading />
}

  const routes = isAuthenticated ? (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/404" component={NotFoundPage} />
      <Route component={NotFoundPage} />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/i/flow/signup" component={SignUp} />
      <Route exact path="/i/flow/verify" component={VerifyModal} />
      <Route exact path="/404" component={NotFoundPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );

  return (
    <div className="App">
      <Router>
        <ToastContainer autoClose={false} />
        {routes}
      </Router>
    </div>
  );
}

export default App;
