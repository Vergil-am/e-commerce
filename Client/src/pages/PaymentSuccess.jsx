import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ResetCart } from '../redux/CartSlice';
import { useNavigate, useLocation } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

function Paymentsuccess() {
  const session_id = useLocation().search.split('=')[1];
  const [Done, setDone] = useState(false)
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  const { user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0()
  // imma continue This
  useEffect(() => {
    const products = cart.Products
    const Price = cart.total

    const CreateOrder = async () => {
      try {
        const payment_status = await axios.post(
          `/order/success/${session_id}`, { products, Price, user });

      } catch (err) {

      }
      dispatch(ResetCart())
      setDone(true)
      Navigate("/cart")
    }

    if (!isLoading && isAuthenticated) {
      CreateOrder()
    }
  }, [session_id, isLoading])


  return (
    <div>Payment success proccessing order please wait ...</div>
  )
}

export default Paymentsuccess
