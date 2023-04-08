import React from 'react'
import styled from 'styled-components';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MapIcon from '@mui/icons-material/Map';

const Container = styled.div`
  display: flex; background-color: #f3f3f3; color: black;
  margin: 10px; border-radius: 20px;
` 
const Left = styled.div`
  flex: 1; flex-direction: column; align-content: center; justify-content: center;
  height: 100%; width: 100%; padding: 20px;
`
const Center = styled.div`
  flex: 1; padding: 20;
`
const Right = styled.div`
  flex: 1; 
  @media only screen  and (max-width: 800px){
    display: none;
    
  }
`
const Logo  = styled.h1`
  display: flex; justify-content: center;
  flex-direction: column; align-items: center;
`
const Icons = styled.div`
  display: flex; justify-content: center;
`
const Icon = styled.div`
  cursor: pointer; margin: 0px 0px 5px 5px;
`
const About = styled.p`
  display: flex; justify-content: center;
`
const Contacts = styled.div`
  display: flex; justify-content: center;
  flex-direction: column;
`
const Contact = styled.div`
   display: flex; justify-content: center;
`
const Title = styled.h1`
  display: flex; justify-content: center;
`
const Links = styled.div`
  list-style: none; 
`
const Li = styled.p`
  margin: 20px; cursor: pointer;
  display: flex; justify-content: center;
  `
const Link = styled.a`
  text-decoration: none; color: black;
`
export default function Footer() {
 
   return (
    <Container>
      <Left>
        <Logo>e-Commerce</Logo>
        <Icons>
          <Icon><FacebookIcon /></Icon>
          <Icon><InstagramIcon /></Icon>
          <Icon><LinkedInIcon /></Icon>
          <Icon><TwitterIcon /></Icon>

        </Icons>
        <About>
          an e-commerce webapp built using react
        </About>
      </Left>
      <Center>
        <Title>Links</Title>
        <Links>
          <Li><Link href='/'>Home</Link></Li>
          <Li><Link href='/products'>Products</Link></Li>
          <Li><Link href='/about'>About us</Link></Li>
        </Links>
      </Center>
      <Right>
        <Title>Contacts</Title>
        <Contacts>
          <Contact><MapIcon style={{marginRight:"10px"}}/>test street 12th avenue</Contact>
          <Contact><AlternateEmailIcon style={{marginRight:"10px"}}/> test@email.com </Contact>
          <Contact><LocalPhoneIcon style={{marginRight:"10px"}}/> 05663387747</Contact>
        </Contacts>
      </Right>
    </Container>    
  )
}
