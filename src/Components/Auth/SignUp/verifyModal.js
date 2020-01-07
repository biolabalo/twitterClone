import React, { useEffect, useState } from "react";
import "./signup.scss";
import Modal from "react-responsive-modal";
import { Form, Spinner } from "react-bootstrap";
import StyledButton from "../../commons/StyledButton";
import axios from "axios";
import firebase from "../../../firebaseConfig";
import useForm from "react-hook-form";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

const db = firebase.firestore();
const auth = firebase.auth();

const VerifyModal = ({ history }) => {
  const [isloading, setIsloading] = useState(false);
  const [isShowPasswordField, setIsShowPasswordField] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!sessionStorage.unregistered_buzzme_user_email) {
      history.push("/i/flow/signup");
    }
  }, []);

  const [open, setModal] = useState(true);

  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });

  const onCloseModal = () => setModal(true);

  const docRef = db
    .collection("unVerifiedUsersEmail")
    .doc(`${sessionStorage.unregistered_buzzme_user_email}`);

  const createUser = async (data, e) => {
    if(!e) return;
    e.preventDefault();
    // create user in auth collection ,
    auth
      .createUserWithEmailAndPassword(email, data.password)
      // delete in unregistered collection
      .then(
        db
          .collection("unVerifiedUsersEmail")
          .doc(email)
          .delete()
          .then(function() {
            history.push("/home");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          })
      );
  };

  
  //afta submitting user password create in firebase
  const verifyUserInFireBase = async (data, e) => {
    if (!e) return;

    e.preventDefault();

    setIsloading(true);

    docRef
      .get()
      .then(function(doc) {
        setIsloading(false);
        if (doc.exists) {
          if (doc.data().vcode == data.vcode) {
            docRef
              .update({ isVerified: true })
              .then(() => {
                setEmail(doc.data().email);
                setIsShowPasswordField(true);
                return sessionStorage.removeItem(
                  "unregistered_buzzme_user_email"
                );
              })
              .catch(err => console.log(err));
          } else {
            toast.error("invalid verification code");
          }
        } else {
          sessionStorage.removeItem("unregistered_buzzme_user_email");
          return history.push("/i/flow/signup");
        }
      })
      .catch(function(error) {
        setIsloading(false);
        toast.error("failed to verify! try again ");
      });

    try {
    } catch (err) {}
  };

  return (
    <>
      <Modal open={open} onClose={onCloseModal} className="hello">
        <section
          className="step-2-view-on-modal"
          // style={modalStep === 2 ? { display: "block" } : { display: "none" }}
        >
          <div className="tsm">
            <svg
              viewBox="0 0 24 24"
              aria-label="Twitter"
              className="r-jwli3a r-4qtqp9 r-yyyyoo r-16y2uox r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
            >
              <g>
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </g>
            </svg>
          </div>
          <div className="mt-3">
            {isShowPasswordField ? (
              <>
                <h4 className="text-left ogibib">Enter your password</h4>
                <Form className="mt-5" onSubmit={handleSubmit(createUser)}>
                  <Form.Group
                    controlId="formBasicEmail"
                    style={{ backgroundColor: "rgb(25, 39, 52)" }}
                    className="klnskjda"
                  >
                    <Form.Label className="mb-0">Password</Form.Label>
                    <Form.Control
                      type="password"
                      style={{
                        backgroundColor: "rgb(25, 39, 52)",
                        color: "white"
                      }}
                      className="asap-riv mb-0"
                      name="password"
                      required
                      placeholder="input your password"
                      ref={register({
                        required: "Password Field is empty",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters"
                        }
                      })}
                      onKeyDown={e =>
                        (e.keyCode === 32 ||
                          e.keyCode === 160 ||
                          e.keyCode === 5760 ||
                          e.keyCode === 8192) &&
                        e.preventDefault()
                      }
                    />
                    {errors.password && (
                      <small className="text-danger password-error-mssg">
                        {errors.password.message}
                      </small>
                    )}
                  </Form.Group>
                  <StyledButton
                    className="st-next-btn mt-5"
                    backgroundColor="rgb(29, 161, 242);"
                    borderColor="transparent"
                    boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48)"
                    buttonColor="#ffff"
                    width="530px"
                    Height="40px"
                    borderRadius="9999px"
                    onClick={createUser}
                    type="submit"
                  >
                    Create Account
                  </StyledButton>
                </Form>
              </>
            ) : (
              <>
                <h4 className="text-left ogibib">
                  Enter your verification code
                </h4>
                <Form
                  className="mt-5"
                  onSubmit={handleSubmit(verifyUserInFireBase)}
                >
                  <Form.Group
                    controlId="formBasicEmail"
                    style={{ backgroundColor: "rgb(25, 39, 52)" }}
                    className="klnskjda"
                  >
                    <Form.Label className="mb-0">Vcode:</Form.Label>
                    <Form.Control
                      type="text"
                      style={{
                        backgroundColor: "rgb(25, 39, 52)",
                        color: "white"
                      }}
                      className="asap-riv mb-0"
                      name="vcode"
                      required
                      ref={register({
                        required: "Input verification code",
                        minLength: {
                          value: 1,
                          message: "Input verification code"
                        }
                      })}
                    />
                    {errors.password && (
                      <small className="text-danger password-error-mssg">
                        {errors.vcode.message}
                      </small>
                    )}
                  </Form.Group>
                  <StyledButton
                    className="st-next-btn mt-5"
                    backgroundColor={
                      isloading ? "transparent" : "rgb(29, 161, 242);"
                    }
                    borderColor="transparent"
                    boxShadow={
                      isloading
                        ? "none"
                        : "0 5px 10px 0 rgba(165, 186, 255, 0.48)"
                    }
                    buttonColor="#ffff"
                    width="530px"
                    Height="40px"
                    borderRadius="9999px"
                    onClick={verifyUserInFireBase}
                    type="submit"
                  >
                    {isloading ? (
                      <Spinner animation="border" variant="warning" />
                    ) : (
                      "Verify"
                    )}
                  </StyledButton>
                </Form>
              </>
            )}
          </div>
        </section>
      </Modal>
    </>
  );
};

export default withRouter(VerifyModal);
