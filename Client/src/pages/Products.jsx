import React, { useState } from "react";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TuneIcon from "@mui/icons-material/Tune";
const contentful = require('contentful')

const Body = styled.div``;
const FilterContainer = styled.div`
    display: flex; justify-content: space-between;
    @media (max-width: 768px) {
        display: flex; flex-wrap: wrap-reverse;
    }
`;
const Filter = styled.div`
    margin: 20px; display: flex;
`;
const Container = styled.div`
    display: flex; flex-wrap: wrap;
    align-items: center; padding: 20px;
    margin-bottom: 300px;
    @media (max-width: 768px) {
        padding: 0;
        justify-content: center;
    }
`;
const Select = styled.select`
    border: none; font-weight: 600; margin-left: 10px;
    max-height: 40px;
    border-radius: 20px; margin-right: 10px;
    background-color: rgba(34, 27, 43, 0.1);
    padding-left: 10px;
    @media (max-width: 768px) {
        display: ${(props) => (props.visibility ? "flex" : "none")};
    }
    
`;
const Option = styled.option`
    
`;

const SearchContainer = styled.div`
  border: 1px; border-radius :20px; width: 90%;
  background-color : rgba(34, 27, 43, 0.1); border-color: rgba(0,0,0, 0.3);
  border-style: solid; margin-left: 5rem;
  max-height: 40px;
  font-size: larger; padding: 10px;
  justify-content: center; display: flex;
  @media (max-width: 768px) {
    margin-left: 0;
  }    
  

`;
const Input = styled.input`
  border: none ; border-radius: 20px;
  background-color: transparent;

`;

const client = contentful.createClient({
  space: 'izmdfhi52bl5',
  accessToken: 'nfCtAYqyYRABC5oWQmwI-luORkf1oePPL2l5ZcCdOqA'
})




function Products() {
  const [ProductList, setProducts] = useState(null);
  const [Toggle, setToggle] = useState(false);
  console.log(ProductList)
  const [Category, setCategory] = useState('');
  // const [query, setQuery] = useState("");
  const Location = useLocation().search.split('=')[1];
  console.log(Location)
  useEffect(() => {
    if (Location !== undefined) {
      setCategory(Location)
    }
    const entry = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'product',
        });
        setProducts(res.items)
      } catch (err) {
        console.log(err)
      }
    }
    entry();
  }, [Location]);

  return (
    <Body>
      <Navbar />
      <FilterContainer>
        <Filter>
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={() => {
              setToggle(!Toggle);
            }}
          >
            <TuneIcon />
          </button>
          <Select
            visibility={Toggle}
            onChange={(e) => setCategory(e.target.value.toLowerCase())}
          >
            <Option value={""}>Category</Option>
            <Option>Phones</Option>
            <Option>Accessories</Option>
          </Select>
          <Select
            visibility={Toggle}
          // onChange={(e) => setQuery(e.target.value)}
          >
            <Option value={""}>Brand</Option>
            <Option>Xiaomi</Option>
            <Option>Iphone</Option>
          </Select>
        </Filter>
        <Filter>
          <SearchContainer>
            <Input
              placeholder="Search..."
            // onChange={(e) => setQuery(e.target.value)}
            />
            <SearchOutlinedIcon
              style={{ color: "#4B0082", fontSize: "larger" }}
            />
          </SearchContainer>
        </Filter>
      </FilterContainer>
      {ProductList && (
        <Container>

          {ProductList.filter((product) => product.fields.category.toLowerCase().includes(Category)).map((product) => (
            <ProductCard key={product.sys.id} product={product} />
          ))}
        </Container>
      )}
      <Footer />
    </Body>
  );
}

export default Products;
