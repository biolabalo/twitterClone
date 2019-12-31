import React, { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import useForm from "react-hook-form";
import firebase from "../../../firebaseConfig";

const Login = ({ history }) => {
  const [isLoginError, setLoginError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError();

    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(data => {
        setIsLoading(false);
        history.push("/home");
      })
      .catch(function(error) {
        if (error.code && error.message) {
          setIsLoading(false);
          return setLoginError(true);
        }
      });
  };

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
            <li style={{ color: "#66757f !important", listStyleType: "none" }}>
              <FontAwesomeIcon icon={faTwitter} style={{ color: "#1da1f2" }} />{" "}
              <Link
                to="/"
                style={{ color: "rgba(0,0,0,.5)", textDecoration: "none" }}
              >
                Home
              </Link>
            </li>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav></Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <section className="login-section">
        <div className="page-canvas">
          <div className="signin-wrapper" data-login-message="">
            <h1>Log in to BuzzMe</h1>
            <form
              className="t1-form clearfix signin js-signin"
              onSubmit={handleSubmit(onSubmit)}
            >
              <fieldset>
                <div className="clearfix field">
                  <input
                    style={
                      isLoginError
                        ? { border: "1px solid red! important" }
                        : { border: "1px solid red! important" }
                    }
                    className={
                      isLoginError
                        ? "login-error"
                        : "js-password-field js-initial-focus"
                    }
                    type="email"
                    name="email"
                    autoComplete="new-passsword"
                    placeholder="Phone, email or username"
                    required
                    ref={register({
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      maxLength: 100
                    })}
                  />
                </div>
                <div className="clearfix field">
                  <input
                    className={
                      isLoginError
                        ? "login-error"
                        : "js-password-field js-initial-focus"
                    }
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    ref={register({ required: true })}
                  />
                </div>
              </fieldset>

              <div className="captcha js-captcha">
                {isLoginError ? (
                  <p style={{ color: "red" }}>invalid credentials</p>
                ) : (
                  ""
                )}
              </div>
              <div className="clearfix">
                <button
                  type="submit"
                  className="submit EdgeButton EdgeButton--primary EdgeButtom--medium"
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? "Loading...." : "Log in"}
                </button>

                <div className="subchck">
                  <label className="t1-label remember">
                    <input type="checkbox" name="remember_me" />
                    Remember me
                    <span className="separator">·</span>
                    <a
                      className="forgot"
                      href="/account/begin_password_reset"
                      rel="noopener"
                    >
                      Forgot password?
                    </a>
                  </label>
                </div>
              </div>
            </form>
            <small>
              {" "}
              New to BuzzMe? <Link to="/i/flow/signup">Sign up now »</Link>
            </small>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
