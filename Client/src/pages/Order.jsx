
import React from 'react'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';




const Container = styled.div``
const Wrapper = styled.div`
  display: flex;
  min-height: 80vh;
`
const OrderContainer = styled.div`
  display: flex; flex-direction: column;
  align-items: center; background-color: rgba(34, 27, 43, 0.1);
  border-radius: 20px; padding: 5px; margin: 20px;
`
const ProductContainer = styled.div`
  display: flex; justify-content: space-between;
  align-items: center; margin: 5px;
  border-radius: 20px;
`
const TextContainer = styled.div`
  display: flex; flex-direction: column;
  margin: 10px; align-items: flex-start;
  justify-content: center;
`
const Text = styled.p`
  color: black;
`
function Order () {

    const {id} = useParams();
    const [Orders, setOrders] = useState([])

    useEffect(() => {
        const getOrders = async () =>{
            try{
                const res = await axios.get(`/order/find/${id}`, {headers:{ Cookie:"access_token"}})
                console.log(res.data)
                setOrders(res.data)
            } catch (err){

            }
        }
        getOrders()
    }, [])
    return (
        <Container>
            <Navbar />
            <Wrapper>
              {Orders.map((order) => 
              <OrderContainer key={order._id}>
                <p>order id: {order._id}</p>
                {order.Products.map((product, index) => {
                  return <Link style={{textDecoration: 'none'}} to={`/product/${product.id}`}>
                  <ProductContainer key={index}> 
                    <img style={{maxWidth: '100px', mixBlendMode: 'multiply'}} src={product.Image}></img>
                    <TextContainer>
                    <Text>Product: {product.Title}</Text>
                    <Text>quantity: {product.quantity}</Text>
                    </TextContainer>
                  </ProductContainer></Link>
                })}
                <Text>{order.Price}</Text>
                <Text>Stauts: {order.Status}</Text>
              </OrderContainer>)}
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Order

































































