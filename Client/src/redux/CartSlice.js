import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    Products: [],
    quantity: 0,
    total: 0,
}


export const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers: {
        AddProduct: (state, action) => {
            state.quantity += action.payload.quantity;
            state.Products.push(action.payload);
            state.total += action.payload.fields.price * action.payload.quantity;
        },
        RemoveProduct: (state, action) => {
            state.quantity -= action.payload.quantity;
            state.Products.splice(action.payload.index, 1);
            state.total -= action.payload.Price * action.payload.quantity;
        },
        ResetCart: (state) => {
            return initialState;
        }
    }
})

export const {AddProduct, RemoveProduct, ResetCart} = cartSlice.actions;
export default cartSlice.reducer;
