import React, { useState } from "react";
import { Link } from "react-router-dom"
import "./home.css";

const Login = ({ history }) => {
  return (
    <>
      <div className="main-container">
        <div className="left">
          <div className="communication-box">
            <div className="message">
              <span className="icon search"></span>
              <p>Follow your interests.</p>
            </div>
            <div className="message">
              <span className="icon group"></span>
              <p>Hear what people are talking about</p>
            </div>
            <div className="message">
              <span className="icon chat"></span>
              <p>Join the conversation.</p>
            </div>
          </div>
        </div>
        <div className="right" style={{background: "#fff"}}>
          <div className="join-box">
            <span className="icon bird"></span>
             <Link to="/login" style={{ textDecoration: "none"}}>   <button id="login-button" className="float-right mt-3">Log in</button></Link>
            <h1>See what's happening in the world right now</h1>
            <h2>Join BuzzMe today.</h2>
            <div className="signup-login">
              <button id="sign-up" onClick={()=> history.push("/i/flow/signup")}>Sign Up</button>
              <Link to="/login" style={{ textDecoration: "none"}}>    <button id="login">Log in</button></Link>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <p className="ml-2 mr-2">About</p>
          <p className="ml-2 mr-2">Help Center</p>
          <p className="ml-2 mr-2">Blog</p>
          <p className="ml-2 mr-2">Status</p>
          <p className="ml-2 mr-2">Jobs</p>
          <p className="ml-2 mr-2">Terms</p>
          <p className="ml-2 mr-2">Privacy Policy</p>
          <p className="ml-2 mr-2">Cookies</p>
          <p className="ml-2 mr-2">Ads info</p>
          <p className="ml-2 mr-2">Brand</p>
          <p className="ml-2 mr-2">Apps</p>
          <p className="ml-2 mr-2">Advertise</p>
          <p className="ml-2 mr-2">Marketing</p>
          <p className="ml-2 mr-2">Businesses</p>
          <p className="ml-2 mr-2">Developers</p>
          <p className="ml-2 mr-2">Directory</p>
          <p className="ml-2 mr-2">Settings</p>
          <p className="ml-2 mr-2">© 2018 Twitter</p>
        </div>
      </footer>
    </>
  );
};

export default Login;
