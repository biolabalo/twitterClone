import React, { useEffect, useState } from "react";
import "./signup.scss";
import Modal from "react-responsive-modal";
import { Form } from "react-bootstrap";
import StyledButton from "../../commons/StyledButton";
import axios from "axios";

const ModalSignUp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setModal] = useState(true);
  const [isNextButtonDisabled, setNextButtonDisabled ] =  useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isShowEmailError, updateShowEmailError ] = useState(false);

  const { email,  name } = formData;

  const onCloseModal = () => {
    setModal(true);
  };

  const onChange = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  const verifyEmail = async() => {
  const res  = await axios.post("https://us-central1-freecodecampapp.cloudfunctions.net/api/verifyEmail");
  console.log(res)  
}

  const verifyEmailValidity = async() => {
    console.log("pressed");
    const testEmail =    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!testEmail.test(email)){
        return updateShowEmailError(true);
    }
    updateShowEmailError(false);
    const { data }  = await axios.post("https://us-central1-freecodecampapp.cloudfunctions.net/api/verifyEmail");
    const {valid, msg} = data;
 
    if(valid && msg === "Email can be used"){
        setNextButtonDisabled(true);
    }

    if(!valid && msg === "Email has already been taken."){
        setNextButtonDisabled(false);
    }
}

  return (
    <>
      <Modal open={open} onClose={onCloseModal} className="hello">
      <div className="tsm">
      <svg viewBox="0 0 24 24" aria-label="Twitter" className="r-jwli3a r-4qtqp9 r-yyyyoo r-16y2uox r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
      <StyledButton
      className="st-next-btn"
       backgroundColor="rgb(29, 161, 242);"
       borderColor="transparent"
       boxShadow={ isNextButtonDisabled ? "" : "0 5px 10px 0 rgba(165, 186, 255, 0.48)"  }
       width="60px"
       Height="30px"
       borderRadius="9999px"
       disabled= { isNextButtonDisabled ? true : false }
       >
        Next
        </StyledButton>
      </div>
        <div className="mt-3">
          <h4 className="text-left ogibib">Create your account</h4>
          <Form className="mt-5">
            <Form.Group
             controlId="formBasicEmail" 
            style={{ backgroundColor: "rgb(25, 39, 52)"}}
            className="klnskjda"
            >
              <Form.Label 
              className="mb-0"
              >Name
              </Form.Label>
              <Form.Control
               type="text"
               style={{ backgroundColor: "rgb(25, 39, 52)", color: "white"}}
               className="asap-riv mb-0"
               name="name"
               value={name}
               onChange={e => onChange(e)}
                />
            </Form.Group> 
            <br/>

            <Form.Group 
            controlId="formBasicPassword" 
            style={{ backgroundColor: "rgb(25, 39, 52)"}}
            className=""
            className={ isShowEmailError ? "klnskjda mb-0 mt-4 mb-0 nlp" : "klnskjda mb-0 mt-4 mb-0"}
            >
              <Form.Label 
              > Email</Form.Label>
              <Form.Control 
              type="email"
              name="email"
              value={email}
              style={{ backgroundColor: "rgb(25, 39, 52)", color: "white"}}
              className="asap-riv"
              autoComplete="off"
              onChange={e => onChange(e)}
              onKeyUp={verifyEmailValidity}
              onBlur={verifyEmailValidity}
              />
            </Form.Group>
          
          </Form>
        </div>
        { isShowEmailError ? <small className="email-error-signup">Please enter a valid email address</small> : ""}
      </Modal>
    </>
  );
};

export default ModalSignUp;
