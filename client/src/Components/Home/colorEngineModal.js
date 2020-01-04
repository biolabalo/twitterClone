import React, { useState } from "react";
import Modal from "react-responsive-modal";
import firebase from "../../firebaseConfig";
import { toast } from "react-toastify";

const db = firebase.firestore();


const ColorEngine = ({ step, open, setModal }) => {
  const [url, setUrl] = useState("");

  const updateColorInFireBase = async color => {
    db.collection("user")
      .doc(`${firebase.auth().currentUser.email}`)
      .update({ userColor: color })
      .then(function() {})
      .catch(function(error) {
        toast.error("failed to update color");
      });
  };


  const updateThemeInFireBase = async userTheme => {
    db.collection("user")
      .doc(`${firebase.auth().currentUser.email}`)
      .update({ userTheme })
      .then(function() {})
      .catch(function(error) {
        toast.error("failed to update color");
      });
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
          ].map((color, index) => {
            return (
              <div className="col" key={index}>
                <div
                  className="rounded-circle"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: color,
                    cursor: "pointer"
                  }}
                  onClick={() => updateColorInFireBase(color)}
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
            { color: "black",
              backgroundColor: "white",
              title: "white",
              borderColor: "rgb(230,236,240)"
            
            },
            {
              color: "white",
              backgroundColor: "rgb(0, 0, 0)",
              title: "Lights out",
              borderColor: "rgb(32,35,39)"
            },
            { 
             color: "white", 
             backgroundColor: "rgb(21, 32, 43)",
             title: "Dim" ,
             borderColor: "rgb(37,51,65)"
            }
          ].map((each, index) => {
            return (
              <div className="col" key={index}>
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
                  onClick={() => updateThemeInFireBase(each)}
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
