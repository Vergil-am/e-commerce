import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { RemoveProduct} from "../redux/CartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { DeleteOutlined } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import ShoppingCartCheckoutOutlined from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import EuroSymbolRoundedIcon from '@mui/icons-material/EuroSymbolRounded';
const Container = styled.div`
   display: flex ; flex-direction: column;

`;
const Wrapper = styled.div`
   display: flex;
    align-items: center; justify-content: center;
   width: 100vw; min-height: 80vh;
    @media (max-width: 900px){
    flex-direction: column;
    margin-bottom: 40px;
    
  }
`;
const CartContainer = styled.div`
   display: flex ; flex-direction: column;
   align-self: flex-start; justify-self: flex-start;
   flex: 1; margin: 20px;
   @media (max-width: 900px){
    width: 90%;
    
  }


`;
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
`;
const Title = styled.h1` 
   font-weight: bold; align-self: center;
`;
const TextContainer = styled.div`
    @media (max-width: 900px){
        position: absolute;
        top: 0px; right: 100px;
    
  }
`;
const ProductContainer = styled.div`
    position: relative;
    max-height: 150px; display: flex;
    background-color: rgba(34, 27, 43, 0.1);
    border-radius: 20px;
    max-width: 100%;  margin: 10px;
`;
const ImageContainer = styled.div`
    max-height: 80%; width: 20%; margin: 10px;
`;
const Price = styled.span`
   position: absolute; right: 20px; bottom: 20px;
   font-size: 24px; display: flex;
   align-items: center; justify-content: center;
   @media (max-width: 525px ){
     font-size: 16px;
  }
   @media (max-width: 900px){
    bottom: 10px; right: 10px;
  }
`;
const Text = styled.p`
    font-size: 24px; font-weight: bold;
    display: flex; align-items: center;
    justify-content: center;

`;
const ProductText = styled.p`
    font-size: 24px; font-weight: bold;
    margin-left: 100px;
   @media ( max-width: 525px) {
     font-size: 15px;
     margin-left: 150px;
   }

`;
const ProductTitle = styled.h1` 
   font-weight: bold; align-self: center;
   margin-left: 100px;
   @media ( max-width: 525px) {
     font-size: 1.5em;
     margin-left: 150px;
   }
`;
const Button = styled.button`
    font-size: 24px; padding: 20px;
    background-color: #050a30;
    border-style: none; border-radius: 20px;
    color: white; position: absolute;
    bottom: -20px; cursor: pointer;
    @media (max-width: 900px){
        bottom: -50px;
    
  }
`;
const DeleteButton = styled.button`
   position: absolute; 
   right: 10px; top: 10px;
   border: none;
   background-color: transparent;
   cursor: pointer;
   &:hover{
     color: red;
   }
`;
const Cart = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
  const Cart = useSelector((state) => state.cart);
  console.log(Cart)
  const Dispatch = useDispatch();
  const {user} = useAuth0();
  const handleDelete = (Product, index) => {
    const Price = Product.fields.price;
    const quantity = Product.quantity;
    Dispatch(RemoveProduct({ index, quantity, Price }));
  };
  const handleCheckout = async () => {
    //TODO there's a lot to do here
    const products = Cart.Products;
    if (Cart.Products.length !== 0) {
      try {
        const Stripe = await stripePromise;
        const res = await axios.post("https://13.48.129.94.nip.io/api/order/payment", {products});
        window.location.replace(res.data);
      } catch (err) { }
    }
  };
  return (
    <Container>
      <Navbar />
      <Title>Your Cart</Title>
      <Wrapper>
        <CartContainer>
          {Cart.Products.map((Product, index) => (
            <ProductContainer key={index}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                }}
                to={`/product/${Product.sys.id}`}
              >
                <ImageContainer>
                  <img
                    style={{
                      objectFit: "cover",
                      height: "100px",
                      margin: "10px",
                    }}
                    src={Product.fields.thumbnail.fields.file.url}
                  />
                </ImageContainer>
                <TextContainer>
                  <ProductTitle>{Product.fields.title}</ProductTitle>
                  <ProductText>Quantity: {Product.quantity}</ProductText>
                </TextContainer>
                <Price>Total price: {Product.fields.price * Product.quantity} €</Price>
              </Link>
              <DeleteButton onClick={() => handleDelete(Product, index)}>
                <DeleteOutlined />
              </DeleteButton>
            </ProductContainer>
          ))}
        </CartContainer>
        <Card>
          <Title>Order summary</Title>
          <Text>Quantity: {Cart.quantity}</Text>
          <Text>Total: {Cart.total} <EuroSymbolRoundedIcon /> </Text>
          <Button onClick={handleCheckout}>Checkout <ShoppingCartCheckoutOutlined /></Button>
        </Card>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
