import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import AccountMenu from "./dropDown";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from "@mui/material";
import LoginButton from "./LoginButton";
import { useAuth0 } from '@auth0/auth0-react';
import ListIcon from '@mui/icons-material/List';


const Container = styled.div`
  height: 65px; background-color: #f3f3f3;
  width: 100%;
  color: white;
  top: 0;
  position: fixed;
  z-index: 2;
  @media (max-width: 768px) {
    height: ${props => (props.Open ? `50%` : `65px`)};
    transition: ease-in-out 0.5s;
  } 

`;
const Wrapper = styled.div`
  padding: 10px 20px; display: flex; justify-content: space-between;
  align-items: center; 
  position: relative;
  height: 100%
  
`;
const Logo = styled.h1` 
  align-self: flex-start; font-size: 30px;
  position: absolute; top: 0px;
`;

const Left = styled.div`
  flex:1 ; align-items: flex-end;

`;
const fadeIn = keyframes`
   from {
    opacity: 0;
    left: -50%;
}
  to {
    opacity: 1;
}
`

const Center = styled.div`
  flex: 1; align-items: center;
  justify-content: space-between;
  display: flex;
  margin-right: 20px;
  @media (max-width: 768px) {
    display: ${props => (props.Open ? `flex` : `none`)};
    opacity: 0;
    font-weight: bold;
    font-size: 2em;
    flex-direction: column;
    height: 50%;
    position: absolute;
    right: 50%;
    left: 50%;
    align-items: space-between;
    justify-content: space-between;
    animation: ${fadeIn} 0.5s 0.5s ;
    animation-fill-mode: forwards;

  } 

`;
const Right = styled.div`
  @media (max-width: 768px) {
    position: absolute;
    top: 20px;
    right: 60px
  }
   
`


const Profile = styled.div`
display: flex; align-items: center;
`;

const Menu = styled.button`
   display: none;
   border: none;
   background-color: transparent;
   position: absolute;
   top: 30px;
   right: 10px;
   @media (max-width: 768px) {
   display: block;


}
`



function Navbar() {
  const { isAuthenticated } = useAuth0();
  const [IsOpen, setIsOpen] = useState(false);
  const CartNumber = useSelector((state) => state.cart.quantity);
  return (
    <Container Open={IsOpen}>
      <Wrapper>
        <Left>
          <Logo>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              {" "}
              E-Commerce{" "}
            </Link>
          </Logo>
        </Left>
        <Center Open={IsOpen}>
          <Link style={{ textDecoration: "none", color: "black" }} to={'/products'}>
            Products
          </Link>
          <Link style={{ textDecoration: "none", color: "black" }} to={'/about'}>
            About
          </Link>
          <Link style={{ textDecoration: "none", color: "black" }} to={'/contact'}>
            Contact
          </Link>
        </Center>
        <Right>
          {isAuthenticated ? (
            <Profile>

              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={"/cart"}
              >
                {" "}
                <Badge badgeContent={CartNumber} color="secondary">
                  <ShoppingCartOutlinedIcon / >
                </Badge>
              </Link>
              <AccountMenu />{" "}

            </Profile>
          ) : (
            <LoginButton />
          )}
        </Right>
        <Menu onClick={() => setIsOpen(!IsOpen)}><ListIcon /></Menu>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
