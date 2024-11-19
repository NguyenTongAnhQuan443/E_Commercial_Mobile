import { createSlice } from "@reduxjs/toolkit";
import CartItemlModel from "../../models/CartItemModel";
import ProductModel from "../../models/ProductModel";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [] as CartItemlModel[],
        totalPrices: 0 as number,
    },
    reducers: {
        addToCart: (state, action) => {
            const { product, quantity, price } = action.payload;
            const existingItem = state.cartItems.find(cartItem => cartItem.product.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                const cartItem = {
                    product: product, 
                    quantity: quantity,
                    price: price,
                };
                state.cartItems.push(cartItem);
            }

            state.totalPrices = calculateTotalPrices(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.product.id !== action.payload.product.id);
            state.totalPrices = calculateTotalPrices(state);
        },
        increaseQuantity: (state, action) => {
            const existingItem = state.cartItems.find(item => item.product.id === action.payload.product.id);

            if (existingItem && existingItem.quantity < action.payload.product.quantity) {
                existingItem.quantity++;
            }
            state.totalPrices = calculateTotalPrices(state);
        },
        decreaseQuantity: (state, action) => {
            const existingItem = state.cartItems.find(item => item.product.id === action.payload.product.id);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity--;
            }
            state.totalPrices = calculateTotalPrices(state);
        },

        changeQuantity: (state, action) => {
            const existingItem = state.cartItems.find(item => item.product.id === action.payload.product.id);

            if (existingItem && action.payload.text !== '' && !isNaN(action.payload.text) && parseInt(action.payload.text) > 0 && parseInt(action.payload.text) <= 10) {
                existingItem.quantity = parseInt(action.payload.text);
            }
            state.totalPrices = calculateTotalPrices(state);
        }

    },
});

function calculateTotalPrices(state: { cartItems: CartItemlModel[]; }) {
    return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

export const { addToCart, removeFromCart, changeQuantity, decreaseQuantity, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
