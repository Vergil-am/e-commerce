import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { AddProduct } from '../redux/CartSlice'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';




const Container = styled.div`
    
`
const Wrapper = styled.div`
  height: 90vh; display: flex;
  flex-wrap: wrap;
  @media (max-width: 900px){
    flex-direction: column;
    width: 100%; padding: 0;
    height: 100%;
    
  }
`
const ImgContainer =styled.div`
  flex: 1; display: flex;
  justify-content: center; align-items: center;
`
const Image = styled.img`
  min-height: 80%; max-width: 80%;
  max-width: 100%; max-height: 100%;
  justify-self: center; align-self: center ;
  object-fit: cover;
  @media (max-width: 900px) {
    width:100%; height: 100%;
  }
`
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
  }
`
const Info = styled.div`
  background-color: rgba(34, 27, 43, 0.1) ;
  width: 80%; height : 80% ; border-radius: 20px;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;

  
`
const Title = styled.h1`
  
`
const Description = styled.p`
    white-space: pre-line;
`
const Text = styled.span`
  display: flex;
`
const ButtonContainer = styled.div`
  display: flex; width: 100%;
  justify-content: center;
`
const AddCartButton = styled.button`
   padding: 15px; max-width: 30%;
   background-color: #050a30;
   color: white; font-size: large;
   border-radius: 30px; cursor: pointer;
   margin-top: 20px; margin-bottom: 20px;
   border: none;
   margin-right: 20px;
   @media (max-width: 900px) {
    max-width: 100%; 
   }
   
`
const Price = styled.span`
  font-weight: bold; font-size: 25px;
`

function Product() {
  const { id } = useParams();
  const [Product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1)

  const User = useSelector(state => state.user)
  const UserID = User.currentUser._id
  const Dispatch = useDispatch()
  useEffect( () => {
    fetch('/product/' + id)
    .then(res => {
        return res.json()
    })
    .then(data => {
        setProduct(data);
    })
  }, [])

  const IncreaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  const DecreaseQuantity = () => {
    if(quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleAddtoCart = async () => {
    //Update Cart
    Dispatch(AddProduct({ ...Product, quantity}))
    await axios.post("/cart/update/" + UserID, {Product : {...Product}})
    
  }

  return (
    <Container>
        <Navbar />
        <Wrapper>
            <ImgContainer>
              {Product && <Image key={Product._id} src={Product.Image} />} 
            </ImgContainer>
            <InfoContainer>
            <Info> 
              {Product && <Title>{ Product.Title }</Title>}
              {Product && <Description>{ Product.Description }</Description>}
              {Product && <Price> <AttachMoneyIcon sx={{fontSize: "large", color: 'black'}}/> {Product.Price * quantity}</Price>}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': {m: 1,},}}>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <Button onClick={DecreaseQuantity}><RemoveIcon /></Button>
                  <Button disableRipple >{quantity}</Button>
                  <Button onClick={IncreaseQuantity}><AddIcon /></Button>
                </ButtonGroup> </Box>
            </Info>
            <ButtonContainer>
              <AddCartButton onClick={handleAddtoCart}>Add to cart</AddCartButton>

            </ButtonContainer>
            </InfoContainer> 
        </Wrapper>
        <Footer />
    </Container>
  )
}


export default Product