import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import promotionReducer from "./slices/promotionSlice";
import deliveryReducer from "./slices/deliverySlice";
import paymentReducer from "./slices/paymentSlice";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
        category: categoryReducer,
        promotion: promotionReducer,
        delivery: deliveryReducer,
        payment: paymentReducer,
        order: orderReducer,
    },
});

export default store;