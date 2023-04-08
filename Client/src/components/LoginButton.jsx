import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";


const ArowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Arow = styled.div`
  margin-top: 1px;
width: 10px;
  background: transparent;
  height: 2px;
  position: relative;
  transition: 0.2s;
&:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  border: solid #000;
  border-width: 0 2px 2px 0;
  display: inline-block;
  top: -3px;
  right: 3px;
  transition: 0.2s;
  padding: 3px;
  transform: rotate(-45deg);
}

`;
const Login = styled.button`
  --primary-color: #645bff;
  --secondary-color: #fff;
  --hover-color: #111;
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  cursor: pointer ;
  background-color:  transparent;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  color:  #000;
  padding: 1em 1.8em;
  display: flex;
  transition: 0.2s background;
  align-items: center;
  gap: 0.6em;
  font-weight: bold;
&:hover {
}
&:hover ${Arow} {
color: #000;
background-color: #000;
&:before {
right: 0; ;
}
}

`;

const LoginButton = () => {
  const { loginWithRedirect} = useAuth0();

  return <Login
    style={{ border: 'none' }}
    onClick={() => loginWithRedirect()}>
    Log In
    <ArowWrapper><Arow></Arow></ArowWrapper>
  </Login>
};

export default LoginButton;
