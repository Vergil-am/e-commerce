import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import '@splidejs/react-splide/css';
import styled from "styled-components";
import { useNavigate } from "react-router";


const Button = styled.div`
   padding: 0.8em 1.8em;
 border: 2px solid #17C3B2;
 position: relative;
 overflow: hidden;
 background-color: transparent;
 text-align: center;
 text-transform: uppercase;
 font-size: 16px;
 transition: .3s;
 z-index: 1;
 font-family: inherit;
 color: #17C3B2;
             cursor: pointer;
  &:before {
     content: '';
 width: 0;
 height: 300%;
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%) rotate(45deg);
 background: #17C3B2;
 transition: .5s ease;
 display: block;
 z-index: -1;
     cursor: pointer;

  }
  &:hover {
    color: #111;
    &:before {
      width: 105%;
    }
  }
`
const CardContainer = styled.div`
  width: 200px; 
  height: 200px; display: flex;
  margin: 30px; margin-bottom: 50px;
      border-radius: 30px;
      box-shadow: 15px 15px 30px #bebebe,
             -15px -15px 30px #ffffff;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => (props.Image)});
  background-repeat: no-repeat;
  background-size: cover;

  `


function Card({ product }) {
  const Navigate = useNavigate()
  const image = product.fields.thumbnail.fields.file.url
  return (
    <CardContainer Image={image}>
      <Button onClick={() => Navigate(`/product/${product.sys.id}`)}>Details</Button>
    </CardContainer>
  )
}
function NewArrivals({ products }) {
  const Width = window.innerWidth
  const [PerPage, setPerPage] = useState(5)
  const [Padding, setPadding] = useState('')
  useEffect(() => {
    if (Width < 479){
      setPerPage(1);
      setPadding('20%')
    } else if (Width < 768) {
      setPerPage(2);
    } else if (Width < 992) {
      setPerPage(3)
    }
  }, [Width])

  return (
    <div>
      <h1>NewArrivals</h1>
      <Splide options={{
        perPage: PerPage,
        width: '95%',
        gap: '30px',
        padding: {left: Padding}
      }}
        aria-label="My Favorite Images"
      >
        {products.map((product) => (
          <SplideSlide>
            <Card product={product} />
          </SplideSlide>
        ))}

      </Splide>
    </div>
  )
}


export default NewArrivals;
