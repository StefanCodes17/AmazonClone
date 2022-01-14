import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    items: []
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers:{
        addToBasket: (state, action) => {
            const idx = state.items.findIndex(items => items.id === action.payload.id)
            let newCart = [...state.items]
            if(idx >= 0){
                newCart[idx].quantity += 1 
                state.items = newCart
            }else{
                state.items = [...state.items, {...action.payload, quantity: 1}]
            }
        },
        removeFromBasket: (state, action) =>{
            const idx = state.items.findIndex(items => items.id === action.payload.id)
            let newCart = [...state.items]
            if(idx >= 0){
                newCart.splice(idx, 1)
            }else{
                console.warn(`Can't remove product at id: ${action.payload.id}`)
            }
            state.items = newCart;
        },
        updateQuantity: (state, action) => {
            const idx = state.items.findIndex(items => items.id === action.payload.id)
            let newCart = [...state.items]
            if(idx >= 0){
                newCart[idx].quantity = action.payload.quantity
            }
            state.items = newCart;
        }
    }
})

export const {addToBasket, removeFromBasket, updateQuantity} = basketSlice.actions

export const selectItems = (state) => state.basket.items
export const selectSubTotal = (state) => state.basket.items.reduce((acc, item) => acc + item.price, 0).toFixed(2)

export default basketSlice.reducer