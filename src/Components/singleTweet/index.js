import React, { useEffect, useState, useContext } from "react";
import LeftSide from "../commons/leftSide";
import CommentModal from "../commentModal";
import { Spinner, Popover, OverlayTrigger } from "react-bootstrap";
import moment from "moment";
import "../Home/home.scss";
import "./singleTweet.scss";
import Isloading from "../404/isLoading";
import Comment from "./comment";
import { Redirect, Link } from "react-router-dom";
import firebase from "../../firebaseConfig";
import { LikesContext, RetweetsContext, userContext } from "../../store";
const db = firebase.firestore();

const SingleTweet = ({ match: { params } }) => {
  const [userData, setUserData] = useContext(userContext);
  const [tweet, setTweet] = useState();
  const [comments, setComments] = useState(false);
  const [openCommentModal, setCommentModal] = useState(false);
  const [tweetSelectedForComment, setTweetSelectedForComment] = useState({});
  const [tweetsLikedByUser, setTweetLikedByUsers] = useContext(LikesContext);
  const [UserRetweets, setUserRetweets] = useContext(RetweetsContext);
  const [isSingleTweetLoading, setSingleTweetLoading] = useState(false);
  const { tweetID } = params;

  useEffect(() => {
    if (!tweetID) return <Redirect to="/404" />;
    setSingleTweetLoading(true);
    db.collection("tweets")
      .doc(tweetID)
      .onSnapshot(function(doc) {
        if (doc.exists) {
          setSingleTweetLoading(false);
          setTweet(doc.data());
        } else {
          setSingleTweetLoading(false);
          if (!tweetID) return <Redirect to="/404" />;
        }
      });
    return () => {};
  }, []);

  useEffect(() => {
    const fetchLikedTweets = async () => {
      try {
        db.collection("comments")
          .where("tweetId", "==", tweetID)
          .onSnapshot(function(querySnapshot) {
            var comments = [];
            querySnapshot.forEach(function(doc) {
              comments.push({ ...doc.data(), id: doc.id });
            });
            // setLikeTweet(false);
            return setComments(comments);
          });
      } catch (err) {
        // setLikeTweet(false);
      }
    };
    fetchLikedTweets();
    return () => {};
  }, []);

  const retweet = tweetId => {
    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);

    const tweetCountRef = db.collection("tweets").doc(tweetId);
    const retweetDocRef = db.collection("retweets").doc(`${Math.random()}`);

    const batch = db.batch();

    // check if tweet exists

    db.collection("retweets")
      .where("tweetId", "==", tweetId)
      .where("userWhoRetweeted", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          // No tweet yet create retweet
          batch.set(retweetDocRef, {
            userWhoRetweeted: firebase.auth().currentUser.uid,
            tweetId
          });
          batch.set(tweetCountRef, { retweets: increment }, { merge: true });
          batch.commit();
        }

        snapshot.docs.forEach(document => {
          if (document.exists) {
            // Tweet exists delete the retweet doc and decrement count
            batch.delete(db.collection("retweets").doc(document.id));
            batch.set(tweetCountRef, { retweets: decrement }, { merge: true });
            batch.commit();
          } else {
          }
        });
      });
  };

  const LikeOrUnLikeTweet = tweetId => {
    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);

    const tweetCountRef = db.collection("tweets").doc(tweetId);
    const likeDocRef = db.collection("likes").doc(`${Math.random()}`);

    const batch = db.batch();

    // check if tweet exists

    db.collection("likes")
      .where("tweetId", "==", tweetId)
      .where("userWhoLiked", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          // No tweet yet create tweet
          batch.set(likeDocRef, {
            userWhoLiked: firebase.auth().currentUser.uid,
            tweetId
          });
          batch.set(tweetCountRef, { likes: increment }, { merge: true });
          batch.commit();
        }

        snapshot.docs.forEach(document => {
          if (document.exists) {
            // Tweet exists delete the like doc and decrement count
            batch.delete(db.collection("likes").doc(document.id));
            batch.set(tweetCountRef, { likes: decrement }, { merge: true });
            batch.commit();
          } else {
          }
        });
      });
  };

  const popover = () => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Retweet</Popover.Title>
      <Popover.Title as="h3">Retweet with Comment</Popover.Title>
    </Popover>
  );

  if (isSingleTweetLoading || !tweet) {
    return <Isloading />;
  } else {
    return (
      <>
        <main
          className="dark-theme"
          style={
            userData && userData.userTheme
              ? {
                  background: userData.userTheme.backgroundColor,
                  color: userData.userTheme.color
                }
              : { background: "#000", color: "white" }
          }
        >
          <div className="containerz">
            <LeftSide userData={userData} />

            <main>
              <div className="main-container">
                {/* middle side */}
                <section
                  style={
                    userData && userData.userTheme
                      ? {
                          borderLeft: `1px solid ${userData.userTheme.borderColor}`,
                          borderRight: `1px solid ${userData.userTheme.borderColor}`
                        }
                      : {
                          borderLeft: `1px solid black`,
                          borderRight: `1px solid black`
                        }
                  }
                >
                  {/* comment section */}

                  <div
                    className="section-header"
                    style={
                      userData && userData.userTheme
                        ? {
                            borderBottom: `1px solid ${userData.userTheme.borderColor}`
                          }
                        : {
                            borderBottom: `1px solid black`
                          }
                    }
                  >
                    <div className="home-refresh dsdses">
                      <Link to="/home">
                        <svg
                          viewBox="0 0 24 24"
                          fill={
                            userData && userData.userColor
                              ? userData.userColor
                              : "white"
                          }
                          className="r-13gxpu9 r-4qtqp9 r-yyyyoo r-1q142lx r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                        >
                          <g>
                            <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
                          </g>
                        </svg>
                      </Link>
                      <span> &nbsp;Tweet</span>
                    </div>
                    <div className="a-container">
                      <a href="#" className="a">
                        <svg
                          viewBox="0 0 24 24"
                          className="main-img"
                          fill={
                            userData && userData.userColor
                              ? userData.userColor
                              : "white"
                          }
                        >
                          <g>
                            <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div
                    className="tweet-input-container"
                    style={
                      userData && userData.userTheme
                        ? {
                            borderBottom: `2px solid ${userData.userTheme.borderColor}`
                          }
                        : {
                            borderBottom: `5px solid black`
                          }
                    }
                  >
                    <div className="avatar-container">
                      <div className="avatar">
                        <img
                          src="assets/png/default_profile_normal.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="tweet-input">
                      <div className="row no-gutters">
                        <div className="col-1">
                          <div className="mt-3">
                            <img
                              src={
                                userData && userData.url
                                  ? userData.url
                                  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAwFBMVEXM1t3K1dy5xc2xvca7xs+KmaVrfYtld4agrrhneYhoeoiksbufrbegrbe7xs66xs6Dk5+/ytKdqrWElKCDk6Byg5HG0NjEz9bH0dlqfIprfIuAkJ2ir7nJ09p1hpN0hZO9yNDH0tmbqbTBzNOzv8iqtsCotL6ntL7L1dy3w8yjsLqVpK+Onam8x9CRn6ttf43CzdWMm6dmeIeLmqauusSwvMVxgpCToa29ydFneIeRoKzK1Nttfo2yvseZp7KHl6OOgUPZAAAA80lEQVR4Ae3SA5oDQRgE0Aortm1zNub9T7Xm4O/+uMo7w8O/duNyezxuF3R5fX4+8vu80BII8lUoDA0RfhKFUizIT4JxqCT4RQIKSZokIUvRJAVZmiYZyLI0yUIWpEkQohwtcpDkaZGHpECLAkRFmpQgK9OkDFmFJhXIqjV+Ua9CoZHlJ9kGlJqtLF9lW01oaXe6vX6308aPMRiOxpPJeDQcQMd0Nuer+WwKlcXS4CfG3QKi1Zwm8xUEAYMWRkAZSbvT2qAtYw1bzQ0dbJqws6WjLWzs9nS038HqQMEBFscTBacjzDoUnWF2oegCsytFV7x6ADhgICRy9ELGAAAAAElFTkSuQmCC"
                              }
                              className="main-avatar-img"
                            />
                          </div>
                        </div>
                        <div className="col-11 p-3">
                          <p className="font-weight-bold mb-1">
                            {" "}
                            {tweet ? tweet.fullName : ""}
                            <svg
                              viewBox="0 0 24 24"
                              aria-label="Verified account"
                              className="main-img Verified-account d-inline"
                            >
                              <g>
                                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                              </g>
                            </svg>
                          </p>
                          <p
                            style={{
                              fontSize: "15px",
                              opacity: "0.5"
                            }}
                          >
                            {tweet ? tweet.Handle : ""}
                          </p>
                        </div>
                      </div>
                      <p>{tweet ? tweet.tweet : ""}</p>
                      <small style={{ opacity: "0.5" }}>
                        {" "}
                        {tweet
                          ? moment(tweet.createdAt).format("MMM D, YYYY")
                          : ""}{" "}
                      </small>
                      {tweet ? (
                        <>
                          {" "}
                          <span style={{ verticalAlign: "text-bottom" }}>
                            .{" "}
                          </span>
                          <small
                            style={
                              userData && userData.userColor
                                ? { color: userData.userColor }
                                : "white"
                            }
                          >
                            {" "}
                            BuzzMe for WEB
                          </small>
                        </>
                      ) : (
                        ""
                      )}
                      <div className="tweet-input-utility mt-1">
                        <div
                          className="like-tweet-comment"
                          style={
                            userData && userData.userTheme
                              ? {
                                  borderBottom: `1px solid ${userData.userTheme.borderColor}`,
                                  borderTop: `1px solid ${userData.userTheme.borderColor}`
                                }
                              : {
                                  borderBottom: `5px solid black`,
                                  borderTop: `5px solid black`
                                }
                          }
                        >
                          <div className=" m-0">
                            <div className=" p-2">
                              <div className="tweet-action">
                                <div className="tweet-action-btn comments-btn">
                                  <div className="icon-container">
                                    <span
                                      className="comment-icon xoxo"
                                      style={{ borderRaduis: "none" }}
                                    >
                                      {tweet && tweet.retweets
                                        ? `${tweet.retweets} ${
                                            tweet.retweets === 1
                                              ? "retweet"
                                              : "retweets"
                                          }`
                                        : ""}
                                    </span>
                                  </div>
                                  <div className="tweet-action-count">
                                    {/* <span>{tweet.comment ? tweet.comment : ""}</span> */}
                                  </div>
                                </div>
                              </div>
                              <div className="tweet-action">
                                <div className="tweet-action-btn retweet-btn">
                                  {tweet && tweet.likes
                                    ? `${tweet.likes} ${
                                        tweet.likes === 1 ? "like" : "likes"
                                      }`
                                    : ""}
                                  <div className="tweet-action-count"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="stream-footer-container">
                        <div className="tweet-action-list">
                          <div className="tweet-action">
                            <div className="tweet-action-btn comments-btn">
                              <div className="icon-container">
                                <span className="comment-icon a">
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="main-img"
                                    onClick={() => {
                                      setTweetSelectedForComment(tweet);
                                      setCommentModal(true);
                                    }}
                                    fill={
                                      userData && userData.userTheme
                                        ? userData.userTheme.color
                                        : "white"
                                    }
                                  >
                                    <g>
                                      <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                                    </g>
                                  </svg>
                                </span>
                              </div>
                              <div className="tweet-action-count">
                                {/* <span>{tweet.comment ? tweet.comment : ""}</span> */}
                              </div>
                            </div>
                          </div>
                          <div className="tweet-action">
                            <div className="tweet-action-btn retweet-btn">
                              <div className="icon-container">
                                <OverlayTrigger
                                  trigger="click"
                                  placement="right"
                                  // overlay={
                                  //   <Popover id="popover-basic">
                                  //     <Popover.Title
                                  //       as="h3"
                                  //       onClick={() => retweet(tweet.id)}
                                  //     >
                                  //       {UserRetweets.includes(tweet.id)
                                  //         ? "Undo Retweet"
                                  //         : "Retweet"}
                                  //     </Popover.Title>
                                  //     <Popover.Title as="h3">
                                  //       Retweet with Comment
                                  //     </Popover.Title>
                                  //   </Popover>
                                  // }
                                >
                                  <span className="retweet-icon a">
                                    <svg
                                      viewBox="0 0 24 24"
                                      className="main-img"
                                      fill={
                                        userData && userData.userTheme
                                          ? userData.userTheme.color
                                          : "white"
                                      }
                                    >
                                      <g>
                                        <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                                      </g>
                                    </svg>
                                  </span>
                                </OverlayTrigger>
                              </div>
                              <div className="tweet-action-count">
                                <span
                                  style={
                                    UserRetweets.includes(tweet.id)
                                      ? { color: "rgb(23,191,99)" }
                                      : { color: "#d9d9d9" }
                                  }
                                >
                                  {tweet.retweets ? tweet.retweets : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="tweet-action">
                            <div className="tweet-action-btn likes-btn">
                              <div className="icon-container">
                                <span className="likes-icon a">
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="main-img"
                                    onClick={() => LikeOrUnLikeTweet(tweetID)}
                                    fill={
                                      userData && userData.userTheme
                                        ? userData.userTheme.color
                                        : "white"
                                    }
                                  >
                                    <g>
                                      <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                                    </g>
                                  </svg>
                                </span>
                              </div>
                              <div className="tweet-action-count">
                                <span
                                  style={
                                    tweetsLikedByUser.includes(tweet.id)
                                      ? { color: "rgb(224,35,94)" }
                                      : { color: "#d9d9d9" }
                                  }
                                >
                                  {tweet.likes ? tweet.likes : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="tweet-action">
                            <div className="tweet-action-btn share-btn">
                              <div className="icon-container">
                                <span className="share-icon a">
                                  <svg viewBox="0 0 24 24" className="main-img">
                                    <g>
                                      <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
                                      <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
                                    </g>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* {TweetsView} */}

                  {/* comment section */}

                  {comments
                    ? comments.map((eachComment, index) => {
                        return (
                          <Comment key={index} eachComment={eachComment} />
                        );
                      })
                    : ""}

                  {/* comment section */}
                </section>

                {/* middle side */}

                {/* far right */}
                <aside>
                  <div className="aside-container">
                    <div className="search-container">
                      <div className="search">
                        <input
                          type="text"
                          name="search"
                          placeholder="Search Twitter"
                          autoComplete="off"
                          spellCheck="false"
                        />
                      </div>
                    </div>
                    <div className="trends-container aside-div-container">
                      <div className="trends aside-div">
                        <div className="trends-head aside-head">
                          <div>
                            <span>Trends for you</span>
                          </div>
                          <div className="a-container">
                            <a href="#" className="a">
                              <svg viewBox="0 0 24 24" className="main-img">
                                <g>
                                  <path d="M12 8.21c-2.09 0-3.79 1.7-3.79 3.79s1.7 3.79 3.79 3.79 3.79-1.7 3.79-3.79-1.7-3.79-3.79-3.79zm0 6.08c-1.262 0-2.29-1.026-2.29-2.29S10.74 9.71 12 9.71s2.29 1.026 2.29 2.29-1.028 2.29-2.29 2.29z"></path>
                                  <path d="M12.36 22.375h-.722c-1.183 0-2.154-.888-2.262-2.064l-.014-.147c-.025-.287-.207-.533-.472-.644-.286-.12-.582-.065-.798.115l-.116.097c-.868.725-2.253.663-3.06-.14l-.51-.51c-.836-.84-.896-2.154-.14-3.06l.098-.118c.186-.222.23-.523.122-.787-.11-.272-.358-.454-.646-.48l-.15-.014c-1.18-.107-2.067-1.08-2.067-2.262v-.722c0-1.183.888-2.154 2.064-2.262l.156-.014c.285-.025.53-.207.642-.473.11-.27.065-.573-.12-.795l-.094-.116c-.757-.908-.698-2.223.137-3.06l.512-.512c.804-.804 2.188-.865 3.06-.14l.116.098c.218.184.528.23.79.122.27-.112.452-.358.477-.643l.014-.153c.107-1.18 1.08-2.066 2.262-2.066h.722c1.183 0 2.154.888 2.262 2.064l.014.156c.025.285.206.53.472.64.277.117.58.062.794-.117l.12-.102c.867-.723 2.254-.662 3.06.14l.51.512c.836.838.896 2.153.14 3.06l-.1.118c-.188.22-.234.522-.123.788.112.27.36.45.646.478l.152.014c1.18.107 2.067 1.08 2.067 2.262v.723c0 1.183-.888 2.154-2.064 2.262l-.155.014c-.284.024-.53.205-.64.47-.113.272-.067.574.117.795l.1.12c.756.905.696 2.22-.14 3.06l-.51.51c-.807.804-2.19.864-3.06.14l-.115-.096c-.217-.183-.53-.23-.79-.122-.273.114-.455.36-.48.646l-.014.15c-.107 1.173-1.08 2.06-2.262 2.06zm-3.773-4.42c.3 0 .593.06.87.175.79.328 1.324 1.054 1.4 1.896l.014.147c.037.4.367.7.77.7h.722c.4 0 .73-.3.768-.7l.014-.148c.076-.842.61-1.567 1.392-1.892.793-.33 1.696-.182 2.333.35l.113.094c.178.148.366.18.493.18.206 0 .4-.08.546-.227l.51-.51c.284-.284.305-.73.048-1.038l-.1-.12c-.542-.65-.677-1.54-.352-2.323.326-.79 1.052-1.32 1.894-1.397l.155-.014c.397-.037.7-.367.7-.77v-.722c0-.4-.303-.73-.702-.768l-.152-.014c-.846-.078-1.57-.61-1.895-1.393-.326-.788-.19-1.678.353-2.327l.1-.118c.257-.31.236-.756-.048-1.04l-.51-.51c-.146-.147-.34-.227-.546-.227-.127 0-.315.032-.492.18l-.12.1c-.634.528-1.55.67-2.322.354-.788-.327-1.32-1.052-1.397-1.896l-.014-.155c-.035-.397-.365-.7-.767-.7h-.723c-.4 0-.73.303-.768.702l-.014.152c-.076.843-.608 1.568-1.39 1.893-.787.326-1.693.183-2.33-.35l-.118-.096c-.18-.15-.368-.18-.495-.18-.206 0-.4.08-.546.226l-.512.51c-.282.284-.303.73-.046 1.038l.1.118c.54.653.677 1.544.352 2.325-.327.788-1.052 1.32-1.895 1.397l-.156.014c-.397.037-.7.367-.7.77v.722c0 .4.303.73.702.768l.15.014c.848.078 1.573.612 1.897 1.396.325.786.19 1.675-.353 2.325l-.096.115c-.26.31-.238.756.046 1.04l.51.51c.146.147.34.227.546.227.127 0 .315-.03.492-.18l.116-.096c.406-.336.923-.524 1.453-.524z"></path>
                                </g>
                              </svg>
                            </a>
                          </div>
                        </div>
                        <div className="aside-body">
                          <a href="#">#trendinTopic1</a>
                          <a href="#">#trendinTopic2</a>
                          <a href="#">#trendinTopic3</a>
                          <a href="#">#trendinTopic4</a>
                        </div>
                        <div className="aside-foot">
                          <a href="#">Show more</a>
                        </div>
                      </div>
                    </div>
                    <div className="whoToFollow-container aside-div-container">
                      <div className="whoToFollow aside-div">
                        <div className="aside-head">
                          <span>Who to follow</span>
                        </div>
                        <div className="aside-body">
                          <a href="#">User 1</a>
                          <a href="#">User 3</a>
                          <a href="#">User 4</a>
                        </div>
                        <div className="aside-foot">
                          <a href="#">Show more</a>
                        </div>
                      </div>
                    </div>
                    <div className="footer">
                      <nav>
                        <a href="#">Terms</a>
                        <a href="#">Privacy policy</a>
                        <a href="#">Cookies</a>
                        <a href="#">Ads info</a>
                        <div>
                          <a
                            href="#"
                            style={{
                              display: "flex",
                              alignItems: "flexEnd",
                              justifyContent: "center"
                            }}
                          >
                            <span style={{ marginRight: "5px" }}>More</span>
                            <svg viewBox="0 0 24 24" className="footer-img">
                              <g>
                                <path d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"></path>
                              </g>
                            </svg>
                          </a>
                        </div>
                        <div>
                          <span>&copy; 2019 Twitter, Inc.</span>
                        </div>
                      </nav>
                    </div>
                  </div>
                </aside>

                {/* far right */}
              </div>
            </main>
          </div>
        </main>
        <CommentModal
          setCommentModal={setCommentModal}
          openCommentModal={openCommentModal}
          tweetSelectedForComment={{...tweetSelectedForComment, id:tweetID}}
          userData={userData}

        />
      </>
    );
  }
};

export default SingleTweet;
