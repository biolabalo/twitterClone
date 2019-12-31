import React, { useState } from "react";
import Modal from "react-responsive-modal";
import firebase from "../../firebaseConfig";
import { toast } from "react-toastify";

const db = firebase.firestore();

const style = {
  width: "40px",
  height: "40px",
  backgroundColor: "yellow"
};

const ColorEngine = ({ step, open, setModal, updateStep }) => {
  const [url, setUrl] = useState("");

  const addBackgroundColorToFireBase = async e => {
  

    // db.collection("user")
    //   .doc(`${firebase.auth().currentUser.email}`)
    //   .set({
    //     fullName,
    //     Bio,
    //     Handle: `@${Handle}`,
    //     gender,
    //     url,
    //     id: firebase.auth().currentUser.uid
    //   })
    //   .then(function() {
    //     setModal(false);
    //     db.collection("userHandle")
    //       .doc(`@${Handle}`)
    //       .set({
    //         Handle: `@${Handle}`,
    //         id: firebase.auth().currentUser.uid
    //       })
    //       .catch(function(error) {
    //         toast.error("failed to save user handle")
    //       });
    //   })
    //   .catch(function(error) {
    //     toast.error("failed to save user")
    //   });
  };

  return (
    <Modal open={open} onClose={() => setModal(false)} className="hello">
      <div className="setColor mb-5 mt-5">
        <h3 className="mb-5 mt-5">Color</h3>
        <div className="row">
          {[
            "rgb(29, 161, 242)",
            "rgb(255, 173, 31)",
            " rgb(224, 36, 94)",
            "rgb(23, 191, 99)"
          ].map((backgroundColor, index) => {
            return (
              <div className="col"
              key={index}
              >
                <div
                  className="rounded-circle"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor,
                    cursor: "pointer"
                  }}
                  onClick={() => addBackgroundColorToFireBase(backgroundColor)}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="setBackGroundColor mt-5">
      <h3>Background Color </h3>
        <div className="row mt-5">
          {[
             {color: "black", backgroundColor: "white", title: "white"},
             {color: "white", backgroundColor:"rgb(0, 0, 0)",title: "Lights out"},
             { backgroundColor:"rgb(21, 32, 43)", color: "white",title: "Dim"}
          ].map((each, index) => {
            return (
              <div className="col"
              key={index}
              >
                <div
                  className=""
                  style={{
                    height: "40px",
                    backgroundColor: each.backgroundColor,
                    color: each.color,
                    border: "1px solid yellow",
                    borderRadius: "5px",
                    padding: "10px",
                    cursor: "pointer",
                    textAlign: "center"
                  }}
                  onClick={() => addBackgroundColorToFireBase(each)}
                >
                    {each.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ColorEngine;
