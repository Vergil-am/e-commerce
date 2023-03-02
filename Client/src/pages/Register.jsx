import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import OutlinedInput from '@mui/material/OutlinedInput';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Container = styled.div`
`
const Wrapper = styled.div`
    height: 80vh; width: 90vw;
    display: flex; justify-content: center;
    align-items: center; 
`
const FormContainer = styled.div`
    width: 40%; display: flex;flex-direction: column;
    align-items: center; justify-content: center;
`
const Title = styled.h1`
   font-size: 24px;
   font-weight: 300;
`
const Form = styled.form`
   display: flex; flex-wrap: wrap;
`
const Error = styled.span`
   margin: 20px;
`
const Button = styled.button`
    background-color: #050a30;
    color: white; font-weight: bold;
    width: 40%; padding: 15px 20px;
    border: none; margin-bottom: 10px;
    margin-top: 20px; cursor: pointer;
    border-radius: 20px;
`

function Register() {
    const navigate = useNavigate();
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Password, setPassword] = useState("");
    const [error, seterror] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", {FirstName, LastName ,Email, Phone, Password});
            const UserID = res.data._id
            const NewCart = await axios.post("/cart", {UserID, Products: []})
        } catch (err) {
            console.log(err)
            seterror(true)
        }
    }
  
    return (
    <Container>
        <Navbar />
        <Wrapper>
            <FormContainer>
                <Title>Create a new accout</Title>
                <Form>
                   <OutlinedInput fullWidth={true} placeholder="First name" onChange={e => setFirstName(e.target.value)}/>
                   <OutlinedInput fullWidth={true} placeholder="Last name"onChange={e => setLastName(e.target.value)}/>
                   <OutlinedInput fullWidth={true} placeholder="Email"onChange={e => setEmail(e.target.value)}/>
                   <OutlinedInput fullWidth={true} placeholder="Phone number"onChange={e => setPhone(e.target.value)}/>
                   <OutlinedInput fullWidth={true} placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
                </Form>
                {error && <Error>Somethinng went wrong</Error>}
                <Button sx={{ paddingLeft: '40px', paddingRight: '40px', marginTop: '20px', borderRadius: '10px'}}variant="contained" onClick={handleRegister}>Create account</Button>
                
            </FormContainer>
            
        </Wrapper>
        <Footer />
    </Container>
    
  )
}

export default Register