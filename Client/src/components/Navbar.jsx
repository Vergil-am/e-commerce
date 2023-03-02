import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import AccountMenu from "./dropDown";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';


const Container = styled.div`
  height: 65px; background-color: #050a30;
  margin: 5px; border-radius: 20px;
  color: white;
  @media (max-width: 768px) {
    min-height: ${({ Open }) => (Open ? "300px" : "60px")};
    transition: min-height 0.3s ease-in-out;
  }
`
const Wrapper = styled.div`
  padding: 10px 20px; display: flex; justify-content: space-between;
  align-items: center;
  
`
const Logo = styled.h1` 
  align-self: flex-start; font-size: 30px;
  position: absolute; top: 0px;
`

const Center = styled.div`
  flex:1 ; align-items: flex-end;
`

const Profile = styled.div`
display: flex; align-items: center;
`

const MenuItem = styled.div`
  font-size: large; cursor: pointer; margin-left: 2rem;

`
function Navbar() {
  const {currentUser} = useSelector(state => state.user)
  const [IsOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const CartNumber = useSelector(state => state.cart.quantity)

  const handleLogout = (e)=> {
    dispatch(logout())
  }
    return (
      <Container Open={IsOpen}>
        <Wrapper>
          <Center>
            <Logo>
               <Link to={"/"} style={{textDecoration:"none", color:"white"}}> E-Commerce </Link>
            </Logo>
          </Center> 
          { currentUser ? (<Profile><Link style={{textDecoration: 'none', color:'white'}} to={`/cart`}> <Badge badgeContent={CartNumber} color="primary"><ShoppingCartIcon /></Badge></Link><AccountMenu /> </Profile>):
              <Link style={{textDecoration: 'none', color:'white'}} to={`/login`}><MenuItem> sign in </MenuItem></Link>
            }

        </Wrapper>
      </Container>
    );
  }
  
export default Navbar;