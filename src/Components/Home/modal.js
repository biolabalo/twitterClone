import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import firebase from "../../firebaseConfig";
import StyledButton from "../commons/StyledButton";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import ImageUpload from "./imageUpload";
import { toast } from "react-toastify";

const db = firebase.firestore();

const NewUserModal = ({ step, open, setModal, updateStep }) => {
  const [url, setUrl] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    Bio: "",
    Handle: ""
  });
  const [gender, setGender] = useState("");

  const [isHandleUnique, setHandleUniqueState] = useState("");

  const { fullName, Bio, Handle } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const createUserInFireBase = async e => {
    e.preventDefault();
    if (!fullName.trim().length || !gender || isHandleUnique !== "true") {
      return toast.error("Ensure all details are properly filled");
    }
    db.collection("user")
      .doc(`${firebase.auth().currentUser.email}`)
      .set({
        fullName,
        Bio,
        Handle: `@${Handle}`,
        gender,
        url,
        id: firebase.auth().currentUser.uid,
        userColor: "rgb(255, 173, 31)",
        userTheme: { 
          color: "white", 
          backgroundColor: "rgb(21, 32, 43)",
          title: "Dim" ,
          borderColor: "rgb(37,51,65)"
         }
      })
      .then(function() {
        setModal(false);
        db.collection("userHandle")
          .doc(`@${Handle}`)
          .set({
            Handle: `@${Handle}`,
            id: firebase.auth().currentUser.uid
          })
          .catch(function(error) {
            toast.error("failed to save user handle")
          });
      })
      .catch(function(error) {
        toast.error("failed to save user")
      });
  };

  const handleGenderChange = event => {
    setGender(event.target.value);
  };

  const checkHandleValidity = () => {
    if (!Handle) return;
    db.collection("userHandle")
      .doc(`@${Handle}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          setHandleUniqueState("false");
        } else {
          //Handle is unique doesn't exist yet
          setHandleUniqueState("true");
        }
      });
  };

  return (
    <Modal open={open} onClose={() => setModal(true)} className="hello">
      {step === 1 ? (
        <>
          <section className="newUserImage"></section>
          <small className="ml-4 mb-3">
            BuzzMe just got lots of new features including dark mode, and so
            much more
          </small>
          <br />
          <small className="d-block text-center" style={{ margin: "0 auto" }}>
            Take a look and buzz what you think
          </small>
          <StyledButton
            className="new-next-btn d-block mt-3"
            backgroundColor="rgb(29, 161, 242);"
            borderColor="transparent"
            buttonColor="#ffff"
            width="160px"
            Height="30px"
            borderRadius="9999px"
            onClick={() => updateStep(2)}
          >
            Next
          </StyledButton>
        </>
      ) : (
        <>
          <div className="mt-3">
            <h4 className="text-left ogibib">Create your account</h4>
            <Form className="mt-5" onSubmit={createUserInFireBase}>
              <Form.Group
                controlId="formBasicEmail"
                style={{ backgroundColor: "rgb(25, 39, 52)" }}
                className="klnskjda"
              >
                <Form.Label className="mb-0">
                  Name<small>*</small>
                </Form.Label>
                <Form.Control
                  type="text"
                  style={{
                    backgroundColor: "rgb(25, 39, 52)",
                    color: "white"
                  }}
                  className="asap-riv mb-0"
                  name="fullName"
                  value={fullName}
                  onChange={e => onChange(e)}
                />
              </Form.Group>

              <br />

              <br />

              <Form.Group
                controlId="exampleForm.ControlSelect1"
                className="mb-4"
              >
                <Form.Label>
                  Gender<small>*</small>
                </Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleGenderChange}
                  style={{ backgroundColor: "seashell" }}
                >
                  <option value="">--Select Gender--</option>
                  <option value="Male">Male</option>
                  <option vale="Female">Female</option>
                </Form.Control>
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                style={{ backgroundColor: "rgb(25, 39, 52)" }}
              >
                <Form.Label> Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="2"
                  style={{
                    backgroundColor: "rgb(25, 39, 52)",
                    color: "white"
                  }}
                  name="Bio"
                  value={Bio}
                  onChange={e => onChange(e)}
                />
              </Form.Group>

              <Form.Label className="mt-3"> Handle</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="create your BuzzMe handle"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{
                    backgroundColor: "rgb(25, 39, 52)",
                    color: "white"
                    // border: "1px solid rgb(25, 39, 52)"
                  }}
                  onKeyDown={e =>
                    (e.keyCode === 32 ||
                      e.keyCode === 50 ||
                      e.keyCode === 160 ||
                      e.keyCode === 5760 ||
                      e.keyCode === 8192) &&
                    e.preventDefault()
                  }
                  name="Handle"
                  value={Handle}
                  onBlur={checkHandleValidity}
                  onChange={e => onChange(e)}
                />
              </InputGroup>
              {isHandleUnique === "false" ? (
                <small className="handle-error"> Handle already taken</small>
              ) : (
                ""
              )}

              <ImageUpload setUrl={setUrl} url={url} className="mt-1" />

              <StyledButton
                className="new-next-btn d-block mt-3"
                backgroundColor="rgb(29, 161, 242);"
                borderColor="transparent"
                buttonColor="#ffff"
                width="160px"
                Height="30px"
                borderRadius="9999px"
                onClick={createUserInFireBase}
              >
                Submit
              </StyledButton>
            </Form>
          </div>
        </>
      )}
    </Modal>
  );
};

export default NewUserModal;
