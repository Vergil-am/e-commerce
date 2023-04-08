import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewArrivals from "../components/NewArrivals";
import { Link } from "react-router-dom";
import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css";
import Categories from "../components/Categories";
import BrowseProductsButton from "../components/BrowseProductsButton";

const contentful = require("contentful");

const Homepage = styled.div`
   width:100%; overflow: hidden;
`;
const Background = styled.div`
  background-color: #f3f3f3;
  color: black;
  width: 100%; height: 80vh;
  background-position: center; background-repeat: no-repeat;
  background-size: cover; display: flex; 
  align-items: center; justify-content: center;
`;
const TextContainer = styled.div`
  flex: 1; display: flex;
  flex-direction: column;
  justify-content: center; align-items: center;
   @media (max-width: 992px) {
    position: absolute;
  } 
`
const HomeImage = styled.img`
  height: 80%;
  @media (max-width: 768px) {
    width: 80%; height: auto
  }
`
const ImageContainer = styled.div`
 flex: 1;display: flex ;justify-content: center;
 align-items: flex-end; height: 100%;
`

const client = contentful.createClient({
  space: "izmdfhi52bl5",
  accessToken: "nfCtAYqyYRABC5oWQmwI-luORkf1oePPL2l5ZcCdOqA",
});

function Home() {
  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
    const FetchProducts = async () => {
      try {
        const res = await client.getEntries({
          content_type: "product",
        });
        setProducts(res.items);
      } catch (err) {
        console.log(err);
      }
    };
    FetchProducts();
  }, []);
  return (
    <div className="Home">
      <Navbar />
      <Homepage>
        <Background>
          <TextContainer>
            <h1>E-commerce</h1>
            <p>The only place to hold all your tech needs</p>
            <Link to={"/products"}>
              <BrowseProductsButton />
            </Link>
          </TextContainer>
          <ImageContainer>
            <HomeImage src="https://images.ctfassets.net/izmdfhi52bl5/5j8pnX9GX02aycotzt5QRe/2550c1357b9fe346f633ac041c5bf9be/My_project.png" />
          </ImageContainer>
        </Background>
        <NewArrivals products={products} />
        <Categories />
      </Homepage>
      <Footer />
    </div>
  );
}

export default Home;
