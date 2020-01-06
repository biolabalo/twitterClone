import React, { useState } from "react";
import ProfileIcon from "../../assets/png/default_profile_normal.png";
import { Link } from "react-router-dom";
import firebase from "../../firebaseConfig";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import ColorEngine from "../Home/colorEngineModal";
import setColor from "../../setColor";
const LeftSide = ({ history, userData }) => {
  const [open, setModal] = useState(false);

  return (
    <>
      {" "}
      <header>
        <div className="header-container">
          <div className="twitter-logo">
            <Link to="/" className="a">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="header-img"
                fill={
                  userData && userData.userColor ? userData.userColor : "white"
                }
              >
                <g>
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                </g>
              </svg>
            </Link>
          </div>
          <div className="header-nav">
            <Link
              to="/home"
              className="a-container"
              style={{
                color: userData && userData.userColor ? userData.userColor : ""
              }}
            >
              <div className="a">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="header-img"
                  fill={
                    userData && userData.userColor
                      ? userData.userColor
                      : "white"
                  }
                >
                  <g>
                    <path d="M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"></path>
                  </g>
                </svg>
                <span>Home</span>
              </div>
            </Link>
            <Link
              to="/"
              className="a-container"
              style={{
                color:
                  userData && userData.userTheme ? userData.userTheme.color : ""
              }}
            >
              <div className="a">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="header-img"
                  fill={
                    userData && userData.userTheme
                      ? userData.userTheme.color
                      : "white"
                  }
                >
                  <g>
                    <path d="M21 7.337h-3.93l.372-4.272c.036-.412-.27-.775-.682-.812-.417-.03-.776.27-.812.683l-.383 4.4h-6.32l.37-4.27c.037-.413-.27-.776-.68-.813-.42-.03-.777.27-.813.683l-.382 4.4H3.782c-.414 0-.75.337-.75.75s.336.75.75.75H7.61l-.55 6.327H3c-.414 0-.75.336-.75.75s.336.75.75.75h3.93l-.372 4.272c-.036.412.27.775.682.812l.066.003c.385 0 .712-.295.746-.686l.383-4.4h6.32l-.37 4.27c-.036.413.27.776.682.813l.066.003c.385 0 .712-.295.746-.686l.382-4.4h3.957c.413 0 .75-.337.75-.75s-.337-.75-.75-.75H16.39l.55-6.327H21c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-6.115 7.826h-6.32l.55-6.326h6.32l-.55 6.326z"></path>
                  </g>
                </svg>
                <span>Explore</span>
              </div>
            </Link>
            <a
              href="/"
              className="a-container"
              style={{
                color:
                  userData && userData.userTheme ? userData.userTheme.color : ""
              }}
            >
              <div className="a">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="header-img"
                  fill={
                    userData && userData.userTheme
                      ? userData.userTheme.color
                      : "white"
                  }
                >
                  <g>
                    <path d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.478c-1.505 0-2.73-1.177-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z"></path>
                  </g>
                </svg>
                <span>Notifications</span>
              </div>
            </a>
            <a
              href="#"
              className="a-container"
              style={{
                color:
                  userData && userData.userTheme ? userData.userTheme.color : ""
              }}
            >
              <div className="a">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="header-img"
                  viewBox="0 0 24 24"
                  fill={
                    userData && userData.userTheme
                      ? userData.userTheme.color
                      : "white"
                  }
                >
                  <g>
                    <path d="M19.25 3.018H4.75C3.233 3.018 2 4.252 2 5.77v12.495c0 1.518 1.233 2.753 2.75 2.753h14.5c1.517 0 2.75-1.235 2.75-2.753V5.77c0-1.518-1.233-2.752-2.75-2.752zm-14.5 1.5h14.5c.69 0 1.25.56 1.25 1.25v.714l-8.05 5.367c-.273.18-.626.182-.9-.002L3.5 6.482v-.714c0-.69.56-1.25 1.25-1.25zm14.5 14.998H4.75c-.69 0-1.25-.56-1.25-1.25V8.24l7.24 4.83c.383.256.822.384 1.26.384.44 0 .877-.128 1.26-.383l7.24-4.83v10.022c0 .69-.56 1.25-1.25 1.25z"></path>
                  </g>
                </svg>
                <span>Messages</span>
              </div>
            </a>
            <a
              href="#"
              className="a-container"
              style={{
                color:
                  userData && userData.userTheme ? userData.userTheme.color : ""
              }}
            >
              <div className="a">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="header-img"
                  fill={
                    userData && userData.userTheme
                      ? userData.userTheme.color
                      : "white"
                  }
                >
                  <g>
                    <path d="M19.75 22H4.25C3.01 22 2 20.99 2 19.75V4.25C2 3.01 3.01 2 4.25 2h15.5C20.99 2 22 3.01 22 4.25v15.5c0 1.24-1.01 2.25-2.25 2.25zM4.25 3.5c-.414 0-.75.337-.75.75v15.5c0 .413.336.75.75.75h15.5c.414 0 .75-.337.75-.75V4.25c0-.413-.336-.75-.75-.75H4.25z"></path>
                    <path d="M17 8.64H7c-.414 0-.75-.337-.75-.75s.336-.75.75-.75h10c.414 0 .75.335.75.75s-.336.75-.75.75zm0 4.11H7c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75zm-5 4.11H7c-.414 0-.75-.335-.75-.75s.336-.75.75-.75h5c.414 0 .75.337.75.75s-.336.75-.75.75z"></path>
                  </g>
                </svg>
                <span
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Display
                </span>
              </div>
            </a>
            <a
              href="#"
              className="a-container"
              style={{
                color:
                  userData && userData.userTheme ? userData.userTheme.color : ""
              }}
            >
              <div className="a">
                <div className="avatar">
                  {userData && userData.url ? (
                    <img
                      src={userData.url}
                      alt="avatar"
                      className="header-img"
                    />
                  ) : (
                    <img
                      src={ProfileIcon}
                      alt="avatar"
                      className="header-img"
                    />
                  )}
                </div>
                <span>Profile</span>
              </div>
            </a>
            <a href="#" 
            className="a-container"
            style={{
              color:
                userData && userData.userTheme ? userData.userTheme.color : ""
            }}
            >
              <div
                className="a"
                onClick={() => {
                  firebase
                    .auth()
                    .signOut()
                    .then(function() {
                      history.push("/login");
                      return setColor("#e6ecf0");
                    })
                    .catch(function(error) {
                      toast.error("failed to logout");
                    });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="header-img"
                  fill={
                    userData && userData.userTheme
                      ? userData.userTheme.color
                      : "white"
                  }
                >
                  <g>
                    <path d="M16.5 10.25c-.965 0-1.75.787-1.75 1.75s.784 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.786-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75zm-4.5-2.5c-.966 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75 1.75-.786 1.75-1.75-.784-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75zm-4.5-2.5c-.965 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.787-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75z"></path>
                    <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path>
                  </g>
                </svg>
                <span>Logout</span>
              </div>
            </a>
          </div>
          <div>
            <div className="btn-container">
              <a
                href="#"
                className="btn btn-large btn-solid"
                style={{
                  backgroundColor:
                    userData && userData.userColor ? userData.userColor : ""
                }}
              >
                <span className="btn-span-text">Tweet</span>
                <span className="btn-span-icon">
                  <svg viewBox="0 0 24 24" className="header-img">
                    <g>
                      <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
                    </g>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>
      <ColorEngine setModal={setModal} open={open} />
    </>
  );
};

export default withRouter(LeftSide);
