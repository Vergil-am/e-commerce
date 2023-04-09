
import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';



const Container = styled.div`
  margin-top: 70px;

`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  align-items: center
`
const OrderContainer = styled.div`
  position: relative;
  display: flex; background-color: rgba(34, 27, 43, 0.1);
  border-radius: 20px; padding: 5px; margin: 20px;
  flex-direction: column;
  width: 50vw;
    @media (max-width: 1200px) {
    width: 70vw;
  }
   @media (max-width: 768px) {
    width: 90vw;
  }

`
const Image = styled.img`
   height: 150px;
`
const ProductContainer = styled.div`
  display: flex; 
  align-items: center; margin: 5px;
  border-radius: 20px;
`
const TextContainer = styled.div`
  display: flex; flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 20px
`
const Text = styled.p`
  color: black;
  font-weight: bold;
`
const Date = styled.span`
   position: absolute;
   right: 10px; bottom: 10px
`

function Order() {
  const { user, getAccessTokenSilently } = useAuth0()
  const [Orders, setOrders] = useState([])
  useEffect(() => {

    const getOrders = async () => {
      if (user !== undefined) {
        const Token = await getAccessTokenSilently()
        console.log(Token)
        const id = user.sub
        const header = `Authorization: Bearer ${Token}`;
        try {
          const res = await axios.get(`/order/find/${id}`, { headers: { header } })
          setOrders(res.data)
        } catch (err) {

        }
      }


    }
    getOrders()
  }, [user])
  return (
    <Container>
      <Navbar />
      <Wrapper>
        {Orders.map((order) =>
          <OrderContainer key={order._id}>
            {order.Products.map((product, index) => {
              return <Link style={{ textDecoration: 'none' }} to={`/product/${product.id}`}>
                <ProductContainer key={index}>
                  <Image src={product.Image} />
                  <TextContainer>
                    <Text>Product: {product.Title}</Text>
                    <Text>Qty: {product.quantity}</Text>
                  </TextContainer>
                </ProductContainer></Link>
            })}
            <Text>{order.Price}</Text>
            <Date>Created:{order.createdAt.split('T')[0]}</Date>
          </OrderContainer>)}
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Order


