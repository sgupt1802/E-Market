import {createSlice} from "@reduxjs/toolkit"

const initialState={
   cartItems:[],
}

export const cartSlice=createSlice({
    initialState,
    name:"cartSlice",
    reducers:{
        setCartItem:(state,action)=>{
            const item=action.payload

            const isItemExist=state.cartItems.find(
                (i)=>i.product===item.product
            )

            if(isItemExist){
                state.cartItems=state.cartItems.map((i)=>
                i.product===isItemExist.product ? item :i
            )
            }else{
                state.cartItems=[...state.cartItems,item]
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        }
    }
});

export const {setCartItem} = cartSlice.actions;
export default cartSlice.reducer;

