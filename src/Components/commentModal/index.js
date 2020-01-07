import React, { useState } from "react";
import Modal from "react-responsive-modal";
import firebase from "../../firebaseConfig";
import moment from "moment";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import avatar from "../../assets/png/avatar.png";
import "./commentModal.scss";
import StyledButton from "../commons/StyledButton";

const db = firebase.firestore();

const CommentModal = ({
  setCommentModal,
  openCommentModal,
  tweetSelectedForComment,
  userData
}) => {

  const [comment, setComment] = useState("");

  const postComment = async () => {
    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);

    const tweetCountRef = db.collection("tweets").doc(tweetSelectedForComment.id);
    const commentsDocRef = db.collection("comments").doc(`${Math.random()}`);

    const batch = db.batch();

    // check if tweet exists
    setCommentModal(false);
    setComment("");

    db.collection("likes")
      .where("tweetId", "==", tweetSelectedForComment.id)
      .where("userWhoLiked", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          // No comment yet create comment
          batch.set(commentsDocRef, {
            userWhoCommented: firebase.auth().currentUser.uid,
            tweetId :  tweetSelectedForComment.id,
            comment,
            userData,
            createdAt: new Date().toISOString(),
          });
          batch.set(tweetCountRef, { comment: increment }, { merge: true });
          batch.commit();
        }

        snapshot.docs.forEach(document => {
          if (document.exists) {
            // Tweet exists delete the like doc and decrement count
            batch.delete(db.collection("comments").doc(document.id));
            batch.set(tweetCountRef, {  comment: decrement }, { merge: true });
            batch.commit();
          } else {
          }
        });
      });
  };

  const onChange = e => {
    setComment(e.target.value);
  };

  return (
    <main className="modal-wrapper">
      <Modal
        open={openCommentModal}
        onClose={() => setCommentModal(false)}
        className="comment-modal"
      >
        <div className="row no-gutters mt-3">
          <div className="col-1">
            <div className="dain-avatar-img">
              <img
                src={tweetSelectedForComment.url}
                className="main-avatar-img img-fluid"
              />
              <hr className="dain-avatar-hr" />
            </div>
          </div>
          <div className="col-10 pl-3">
            <strong className="fullname">
              {tweetSelectedForComment.fullName}
            </strong>
            {tweetSelectedForComment.Handle} &nbsp;
            <span className="dotz">.</span>
            <span className="timestamp">
              <small>
                {" "}
                {/* {moment(`${tweetSelectedForComment.createdAt}`).fromNow()} */}
              </small>
            </span>
            <div className="tweet-text-container">
              <p>{tweetSelectedForComment.tweet}</p>
            </div>
            <div className="tweet-text-container mt-2">
              <p>
                replying to &nbsp; <b>{tweetSelectedForComment.Handle}</b>
              </p>
            </div>
          </div>
        </div>
        <div className="row no-gutters mt-3">
          <div className="col-1">
            <div className="dain-avatar-img">
              <img
                src={userData ? userData.url : avatar}
                className="main-avatar-img img-fluid"
              />
            </div>
          </div>
          <div className="col-11 pl-3">
            <Form.Group controlId="formBasicEmail" onSubmit={postComment}>
              <Form.Control
                style={{ background: "transparent", color: "white" }}
                type="text"
                placeholder="Tweet your reply"
                value={comment}
                name="comment"
                onChange={e => onChange(e)}
              />
            </Form.Group>
          </div>
        </div>
        <StyledButton
          className="new-next-btn d-block float-right"
          backgroundColor={
            userData && userData.userColor ? userData.userColor : ""
          }
          borderColor="transparent"
          buttonColor="black"
          width="80px"
          Height="40px"
          borderRadius="50px"
          opacity={comment.trim().length === 0 ? 0.6 : 1}
          disabled={comment.trim().length === 0 ? true : false}
          onClick={postComment}
        >
          Buzz
        </StyledButton>
      </Modal>
    </main>
  );
};

export default CommentModal;
