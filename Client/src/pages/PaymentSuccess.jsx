import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ResetCart } from '../redux/CartSlice';
import { useNavigate } from 'react-router';

function Paymentsuccess() {
    const Cart = useSelector(state => state.cart);
    const User = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    useEffect( () => {
      const CreateOrder = async () => {
        try {
          const res = await axios.post("/order", {UserId: User._id, 
            Products: Cart.Products.map((item) => ({
              Title: item.Title,
              id: item._id,
              Image: item.Image,
              quantity: item.quantity,
              Price: Cart.total,
            })) }, {headers:{ Cookie:"access_token"}})
        } catch (err){
          console.log(err)
        }
      }
      CreateOrder()
      dispatch(ResetCart())
      Navigate("/cart")
    }, [])


  return (
    <div>Payment success proccessing order please wait ...</div>
  )
}

export default Paymentsuccess