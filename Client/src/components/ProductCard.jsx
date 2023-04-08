import React from "react";
import styled from "styled-components";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Link } from "react-router-dom";

import EuroSymbolRoundedIcon from '@mui/icons-material/EuroSymbolRounded';

const ImgContainer = styled.div`
   width: 200px; height: 200px;
   display: flex; align-items: center;
   justify-content: center;


`;
const Image = styled.img`
    height: 100%; width: 100%;
    object-fit: cover; align-items: center;
    justify-content: center;

`;
const Price = styled.p`
   position: absolute;
   bottom: 10px; left: 10px;
   display: flex; align-items: center; justify-content: center;
   color: black; font-weight: 600;
`;
const Background = styled.div`
    background-color: rgba(34, 27, 43, 0.5); opacity: 0;
    position: absolute; top: 0; left: 0;  height: 100%; width: 100%;
`;
const Info = styled.div`
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%; display: flex;
    justify-content: center; align-items: center;
    
    
`;
const Title = styled.h3`
    color: black; position: absolute;
    left: 10px; bottom: 20%;
`;
const ProductContainer = styled.div`
    flex: 1;
    min-width: 200px; max-width: 200px;
    min-height: 300px; max-height: 300px;
    padding: 10px; margin: 20px;
    position: relative; display: inline-block;
    align-items: center; justify-content: center;
       box-shadow: 15px 15px 30px #bebebe,
             -15px -15px 30px #ffffff;
      border-radius: 20px;
    &:hover ${Background}{
        opacity: 0.5; border-radius: 20px;
        border-style: none; box-shadow: 2px 2px 26px -2px rgba(34,27,43,0.7);

    }
    &:hover {
        @media (min-width: 768px) {
            scale: 1.1
        }
    }

`;


function ProductCard({ product }) {
	return (
		<Link to={`/product/${product.sys.id}`}>
			<ProductContainer>
				<ImgContainer>
					<Image  src={product.fields.thumbnail.fields.file.url} />
				</ImgContainer>
				<Background></Background>
				<Info>
					<Title>{product.fields.title}</Title>
					<Price>
						<EuroSymbolRoundedIcon sx={{ marginRight: "5px" }} /> {product.fields.price}
					</Price>
				</Info>
			</ProductContainer>
		</Link>
	);
}


export default ProductCard;
