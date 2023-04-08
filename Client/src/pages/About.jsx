import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'



const Container = styled.div``
const Wrapper = styled.div`
    height: 100vh; width: 100vw;
    margin-top: 70px;
    display: flex; align-items: center;
    justify-content: center;
    flex-direction: column;
`
function About() {
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <h1>About us</h1>
        <p>coming soon ... </p>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default About
