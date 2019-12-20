import styled from "styled-components";

const StyledButton = styled.button`
  color: ${props => props.buttonColor || "#ffffff"};
  background: ${props => props.backgroundColor || "#ffffff"};
  width: ${props => props.width || "50px"};
  height: ${props => props.Height || "50px"};
  border-radius: ${props => props.borderRadius || ""};
  opacity: 1;
  border-color: ${props => props.borderColor || ""};
  outline: none !important;
  box-shadow: ${props => props.boxShadow || ""};
  font-size: ${props => props.fontSize || "0.9em"};
`;
export default StyledButton;
