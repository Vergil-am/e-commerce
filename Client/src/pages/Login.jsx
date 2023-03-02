import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import { useSelector } from 'react-redux'
import OutlinedInput from '@mui/material/OutlinedInput';

const Container = styled.div``
const Wrapper = styled.div`
    height: 80vh; width: 100vw;
    display: flex; justify-content: center;
    align-items: center;
`
const FormContainer = styled.div`
    width: 25%; display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Title = styled.h1`
   font-size: 24px;
   font-weight: 300;
`
const Form = styled.form`
   display: flex; flex-wrap: wrap;
   align-items: center; justify-content: center;
`

const Button = styled.button`
    background-color: #050a30;
    color: white; font-weight: bold;
    width: 40%; padding: 15px 20px;
    border: none; margin-bottom: 10px;
    margin-top: 20px; cursor: pointer;
    border-radius: 20px;
    
`
const Error = styled.span`
    color: red
`
const Text = styled.p``
function Login() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {loading, error} = useSelector(state => state.user)
   const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart())
        try {
            const res = await axios.post("/auth/login", {Email, Password});
            dispatch(loginSuccess(res.data))
            navigate('/')
            console.log(res.data)
        } catch (err) {
            dispatch(loginFailure());
        }
    }
    return (
        <Container>
            <Navbar />
            <Wrapper>
                <FormContainer>
                    <Title>sign in to your accout</Title>
                    <Form>
                        <OutlinedInput fullWidth={true} placeholder="Email" onChange={e => setEmail(e.target.value)} />
                        <OutlinedInput fullWidth={true} placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
                    </Form>
                
                    <Button onClick={handleLogin} disabled={loading}>Sign in</Button>
                    {error && <Error> Wrong Email or password</Error>}
                    <Text> you don't have an account? <Link to={"/register"}> Join Us Now</Link></Text>
                </FormContainer>

            </Wrapper>
            <Footer />
        </Container>
    
  )
}

export default Login