import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { id, quantity} = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ ...action.payload, quantity: quantity });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        increaseQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem && existingItem.quantity < 10) {
                existingItem.quantity++;
            }
        },
        decreaseQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity--;
            }
        },

        changeQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem && action.payload.text !== '' && !isNaN(action.payload.text) && parseInt(action.payload.text) > 0 && parseInt(action.payload.text) <= 10) {
                existingItem.quantity = parseInt(action.payload.text);
            }
        }

    }
});

export const { addToCart, removeFromCart, changeQuantity, decreaseQuantity, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
