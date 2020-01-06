import React from "react";
import "../Auth/SignUp/signup.scss";
import StyledButton from "../../Components/commons/StyledButton";

const NetworkError = () => {
  return (
    <>
      <div className="Signup">
        <div className="wrapper" style={{ background: "rgb(21, 32, 43)" }}>
          <h1 className="text-center text-white"> Oops! Network Error</h1>
          <svg width="200" height="200" viewBox="0 0 216 216">
            <path
              id="twitter"
              d="M193.9,64c0.1,1.9,0.1,3.8,0.1,5.7c0,58.6-44.6,126.1-126.1,126.1c-25,0-48.3-7.3-67.9-19.9
          c3.5,0.4,7,0.6,10.6,0.6c20.8,0,39.9-7.1,55-19c-19.4-0.4-35.8-13.2-41.4-30.8c2.7,0.5,5.5,0.8,8.3,0.8c4,0,8-0.5,11.7-1.6
          C24,121.9,8.7,104,8.7,82.5c0-0.2,0-0.4,0-0.6c6,3.3,12.8,5.3,20.1,5.5C16.9,79.6,9,66,9,50.6c0-8.1,2.2-15.7,6-22.3
          c21.9,26.8,54.5,44.5,91.3,46.3c-0.8-3.2-1.1-6.6-1.1-10.1c0-24.5,19.8-44.3,44.3-44.3c12.7,0,24.3,5.4,32.3,14
          c10.1-2,19.6-5.7,28.1-10.8c-3.3,10.3-10.3,19-19.5,24.5c9-1.1,17.5-3.5,25.5-7C210.1,49.9,202.5,57.7,193.9,64z"
              strokeDasharray="1100 1100"
            />
          </svg>
          button={" "}
          <StyledButton
            className="st-next-btn mt-5"
            backgroundColor="rgb(29, 161, 242);"
            borderColor="transparent"
            boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48)"
            buttonColor="#ffff"
            width="530px"
            Height="40px"
            borderRadius="9999px"
            onClick={() => window.location.reload()}
            type="submit"
          >
            Refresh Page
          </StyledButton>
        </div>
      </div>
    </>
  );
};
export default NetworkError;
