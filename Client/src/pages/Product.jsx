import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { AddProduct } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAuth0 } from "@auth0/auth0-react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import '@splidejs/react-splide/css';
import AddShoppingCartOutlined from "@mui/icons-material/AddShoppingCartOutlined";
import EuroSymbolRoundedIcon from '@mui/icons-material/EuroSymbolRounded';
const contentful = require('contentful')
const Container = styled.div`
    
`;
const Wrapper = styled.div`
  height: 90vh; display: flex;
  flex-wrap: wrap;
  @media (max-width: 900px){
    flex-direction: column;
    width: 100%; padding: 0;
    height: 100%;
    margin-top: 70px;
    
  }
`;
const ImgContainer = styled.div`
  flex: 1; display: flex;
  justify-content: center; align-items: center;
  margin: 20px
`;
const Image = styled.img`
  min-height: 80%; max-width: 80%;
  max-width: 100%; max-height: 100%;
  justify-self: center; align-self: center ;
  object-fit: cover;
  @media (max-width: 900px) {
    width:100%; height: 100%;
  }
`;
const InfoContainer = styled.div`
  flex: 1; display: flex;
  margin-right: 30px;
  flex-direction: column; 
  justify-self: center;
  align-self: center;
  padding-left: 50px ;
  border-radius: 20px;
  align-items: center; justify-content: center;
  @media (max-width: 900px){
    width: 80%;
    padding-left: 0;
    margin-right: 0;
  }
`;
const Info = styled.div`
  background-color: rgba(34, 27, 43, 0.1) ;
  width: 80%; height : 80% ; border-radius: 20px;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;

  
`;
const Title = styled.h1`
  
`;
const Description = styled.p`
    white-space: pre-line;
`;

const ButtonContainer = styled.div`
  display: flex; width: 100%;
  justify-content: center;
`;
const AddCartButton = styled.button`
   padding: 15px; max-width: 30%;
   background-color: #050a30;
   color: white; font-size: large;
   border-radius: 30px; cursor: pointer;
   margin-top: 20px; margin-bottom: 20px;
   border: none;
   margin-right: 20px;
   display: flex; align-items: center;
   justify-content: center;
   @media (max-width: 900px) {
    max-width: 100%; 
     margin-top: 10px; margin-right: 0;
   }
   
`;
const Price = styled.span`
  font-weight: bold; font-size: 25px;
`;

const client = contentful.createClient({
  space: 'izmdfhi52bl5',
  accessToken: 'nfCtAYqyYRABC5oWQmwI-luORkf1oePPL2l5ZcCdOqA'
})
function Product() {
  const { id } = useParams();
  const [Product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const Dispatch = useDispatch();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await client.getEntry(id)
        setProduct(res)
      } catch (err) {
        console.log(err)
      }
    }
    getProduct()
  }, [id]);

  const IncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const DecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddtoCart = async () => {

    //Update Cart
    if (!isAuthenticated) {
      loginWithRedirect({ returnTo: window.location.href })
    } else {
      if (isAuthenticated) {
        Dispatch(AddProduct({ ...Product, quantity }));
      }
    }
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          {Product && <Splide aria-label="My Favorite Images">
            { Product.fields.pictures ?
              Product.fields.pictures.map((picture) =>
            <SplideSlide>
              <img style={{width: '100%'}} src={picture.fields.file.url} alt="Image 1" />
            </SplideSlide>
            ): <Image src={Product.fields.thumbnail.fields.file.url} />}
          </Splide>}
        </ImgContainer>
        <InfoContainer>
          <Info>
            {Product && <Title>{Product.fields.title}</Title>}
            {Product && <Description>{documentToReactComponents(Product.fields.description)}</Description>}
            {Product && (
              <Price>
                <EuroSymbolRoundedIcon sx={{ fontSize: "large", color: "black" }} />{" "}
                {Product.fields.price * quantity}
              </Price>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": { m: 1 },
              }}
            >
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button onClick={DecreaseQuantity}>
                  <RemoveIcon />
                </Button>
                <Button disableRipple>{quantity}</Button>
                <Button onClick={IncreaseQuantity}>
                  <AddIcon />
                </Button>
              </ButtonGroup>
            </Box>
          </Info>
          <ButtonContainer>
            <AddCartButton onClick={handleAddtoCart}>Add to cart <AddShoppingCartOutlined style={{marginLeft: '10px'}} /></AddCartButton>
          </ButtonContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Product;
