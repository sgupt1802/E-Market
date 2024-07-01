import {createSlice} from "@reduxjs/toolkit"

const initialState={
   setCartItem:[],
}

export const cartSlice=createSlice({
    initialState,
    name:"cartSlice",
    reducers:{
        setCartItem:(state,action)=>{
            const item=action.payload
        }
    }
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;

