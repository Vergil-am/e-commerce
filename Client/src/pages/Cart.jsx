import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import  { RemoveProduct, ResetCart }  from '../redux/CartSlice'

const Container = styled.div`
   display: flex ; flex-direction: column;

`
const Wrapper = styled.div`
   display: flex;
    align-items: center; justify-content: center;
    width: 100vw;
    @media (max-width: 900px){
    flex-direction: column;
    margin-bottom: 40px;
    
  }
`
const CartContainer = styled.div`
   display: flex ; flex-direction: column;
   align-self: flex-start; justify-self: flex-start;
   flex: 1; margin: 20px;
   @media (max-width: 900px){
    width: 90%;
    
  }


`
const Card = styled.div`
   width: 20vw; height: 50vh; 
   background-color: rgba(34, 27, 43, 0.1);
   justify-self: flex-end;
   flex: 1; margin: 20px;
   max-width: 30%; 
   display: flex; flex-direction: column;
   align-items: center;
   justify-content: center;
   border-radius: 20px;
   position: relative;
   @media (max-width: 900px){
    min-width: 90%;
    
  }
`
const Title = styled.h1` 
   font-weight: bold; align-self: center;
`
const TextContainer = styled.div`
    @media (max-width: 900px){
        position: absolute;
        top: 0px; right: 100px;
    
  }
`
const ProductContainer = styled.div`
    position: relative;
    max-height: 150px; display: flex;
    background-color: rgba(34, 27, 43, 0.1);
    border-radius: 20px;
    max-width: 100%;  margin: 10px;
`
const ImageContainer = styled.div`
    max-height: 80%; width: 20%; margin: 10px;
`
const Price = styled.span`
   position: absolute; right: 20px; bottom: 20px;
   font-size: 24px;
   @media (max-width: 900px){
    bottom: 10px; right: 10px;
    
  }
`
const Text = styled.p`
    font-size: 24px; font-weight: bold;

`
const ProductText = styled.p`
    font-size: 24px; font-weight: bold;
    margin-left: 100px;

`
const ProductTitle = styled.h1` 
   font-weight: bold; align-self: center;
   margin-left: 100px;
`
const Button = styled.button`
    font-size: 24px; padding: 20px;
    background-color: #050a30;
    border-style: none; border-radius: 20px;
    color: white; position: absolute;
    bottom: -20px; cursor: pointer;
    @media (max-width: 900px){
        bottom: -50px;
    
  }
`
const DeleteButton = styled.button`
   position: absolute; 
   right: 10px; top: 10px;
`
const Cart = () => {
    const Cart = useSelector(state => state.cart)
    const Dispatch = useDispatch();
    const navigate = useNavigate()
    const handleDelete = (Product, index) => {
      const Price = Product.Price
      const quantity = Product.quantity
      Dispatch(RemoveProduct({index, quantity, Price}))
    }
    const handleCheckout = ()=> {

      if (Cart.Products.length !== 0) {
              navigate("/payment")
              // Dispatch(ResetCart())
      }
      

    }
  return (
    <Container>
        <Navbar />
        <Title>Your Cart</Title>
        <Wrapper>
            <CartContainer>
            {Cart.Products.map((Product, index) => (
                
                    <ProductContainer key={index}>
                      <Link style={{textDecoration: 'none', color: 'black', display: 'flex'}} to={`/product/${Product._id}`}>
                        <ImageContainer>
                            <img style={{objectFit: "cover", height: '100px', margin: '10px'}} src={Product.Image} />
                        </ImageContainer>
                        <TextContainer>
                            
                            <ProductTitle>{Product.Title}</ProductTitle>
                            <ProductText>Quantity: {Product.quantity}</ProductText>
                        </TextContainer>
                        <Price>Total price: {Product.Price * Product.quantity} $</Price>
                        </Link>
                        <DeleteButton onClick={()=> handleDelete(Product, index)}>delete</DeleteButton>
                    </ProductContainer>
                    
            ))}
            </CartContainer>
            <Card>
                <Title>Order summary</Title>
                <Text>Quantity: {Cart.quantity}</Text>
                <Text>Total: {Cart.total} $</Text>
                <Button onClick={handleCheckout}>Checkout</Button>
            </Card>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default Cart