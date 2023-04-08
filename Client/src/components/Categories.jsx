import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';


const Container = styled.div``
const CategoriesContainer = styled.div`
 display: flex; justify-content: center;
 flex-wrap: wrap

`
const Category = styled.div`
   background-color: #dddee0;
   width: 40%;
   margin: 30px;
   height: 25vh;
   border-radius: 30px;
   box-shadow: 15px 15px 30px #bebebe,
             -15px -15px 30px #ffffff;
     overflow: hidden;
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
  @media (max-width: 869px) {
     width: 80%
     
   }

`
const Image = styled.img`
   height: 100%; width: auto;
   position: absolute;

`
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

function Categories() {
  const Navigate = useNavigate()
  return (
    <Container>
      <h1>Categories</h1>
      <CategoriesContainer>
        <Category>
          <Image src='https://images.ctfassets.net/izmdfhi52bl5/5R0Sa8OOF3WFetbM2SaFqh/aa3633d3b06dbffa67be7c8d52d77749/My_project__1_.png' />
          <Button onClick={() => Navigate(`/products?category=accessories`)}>Accessories</Button>

        </Category>
        <Category>
          <Image src='https://images.ctfassets.net/izmdfhi52bl5/1bWI20gNtzGLirAJSMFLHg/456fd472db63a5fc3c4e2a88f5471b58/apple_iphone-12_super-retina-xdr-display_10132020-1536x864-removebg-preview.png?h=250' />
          <Button onClick={() => Navigate(`/products?category=phones`)}>Phones</Button>
        </Category>
      </CategoriesContainer>
    </Container>
  )
}

export default Categories;
