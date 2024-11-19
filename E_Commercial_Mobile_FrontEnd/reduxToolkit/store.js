import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import promotionReducer from "./slices/promotionSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
        category: categoryReducer,
        promotion: promotionReducer,
    },
});

export default store;