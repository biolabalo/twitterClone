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
  const [url, setUrl] = useState("");
  const [comment, setComment] = useState("");

  const postComment = async userTheme => {
    db.collection("user")
      .doc(`${firebase.auth().currentUser.email}`)
      .update({ userTheme })
      .then(function() {})
      .catch(function(error) {
        toast.error("failed to update color");
      });
  };

  const onChange = e => {
    setComment(e.target.value);
  };

  return (
    <main className="modal-wrapper" style={{ height: "200px" }}>
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
            <span className="dot">.</span>
            <span className="timestamp">
              <small>
                {" "}
                {moment(`${tweetSelectedForComment.createdAt}`).fromNow()}
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
