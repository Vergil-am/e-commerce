import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';


const Homepage = styled.div`
  height: 100vh; width:100vw;
  

`

const Background = styled.div`
  background-image: url(https://firebasestorage.googleapis.com/v0/b/test-3b755.appspot.com/o/e-commerce%2F2202_w039_n003_110b_p1_110.jpg?alt=media&token=85e1eb18-eb14-4809-bf64-956c6bf9739c);
  width: 100%; height: 100%;
  background-position: center; background-repeat: no-repeat;
  background-size: cover; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
`
const Button = styled.button`
  padding: 20px; border-style: none;
  border-radius: 20px; background-color: black;
  font-size: 25px; color: white; font-weight: 500;
  cursor: pointer;
`
function Home() {
    return (
      <div className="Home">
        <Navbar />
        <Homepage>
          <Background>
            <Link to={'/products'}><Button>Browse products <ShoppingCartCheckoutIcon /></Button></Link>
          </Background>
        </Homepage>
        <Footer />
      </div>
    );
  }
  
export default Home
