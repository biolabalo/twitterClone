import React, { useEffect, useState, useContext } from "react";
import LeftSide from "../commons/leftSide";
import { userContext } from "../../store";
import CommentModal from "../commentModal";
import "../Home/home.scss";
import "./singleTweet.scss";
import { Redirect } from "react-router-dom";
import firebase from "../../firebaseConfig";
const db = firebase.firestore();


const SingleTweet = ({ match: { params } }) => {
  const [userData, setUserData] = useContext(userContext);
  const [tweet, setTweet] = useState();
  const  [comments, setComments] = useState();
  const { tweetID } = params;

  useEffect(() => {
    if (!tweetID) return <Redirect to="/404" />;

    db.collection("tweets")
      .doc(tweetID)
      .onSnapshot(function(doc) {
        if (doc.exists) {
          setTweet(doc.data());
        } else {
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

console.log(tweet, comments)

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
                  <div className="home-refresh">
                    <span>Home</span>
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
                      <img src="assets/png/default_profile_normal.png" alt="" />
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
                      <div className="col-11">
                        <div className="input"></div>
                      </div>
                    </div>

                    <div className="tweet-input-utility">
                      <div
                        className="like-tweet-comment mb-4"
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
                      ></div>
                    </div>
                  </div>
                </div>

                {/* each tweet */}

                {/* {TweetsView} */}
                <div
                  className="section-header p-3"
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
                  <div className="row w-100">
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
                    <div className="col-11 pl-4 pt-2">
                     <small>vcndff</small>
                     <br/>
                     <small>vcndff</small>
                    </div>
                  </div>
                </div>
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
      {/* <CommentModal
            setCommentModal={setCommentModal}
            openCommentModal={openCommentModal}
            tweetSelectedForComment={tweetSelectedForComment}
            userData={userData}
          /> */}
    </>
  );
};

export default SingleTweet;
