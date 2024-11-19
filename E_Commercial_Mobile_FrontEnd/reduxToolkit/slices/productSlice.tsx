import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ProductModel from "../../models/ProductModel";

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/products");
        return response.data;
    } catch (error) {
        throw error;
    }
})

const getProductById = createAsyncThunk("products/getProductById", async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
})

const getProductByCategoryId = createAsyncThunk("products/getProductByCategoryId", async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/products/by-category/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
})

const getProductExclusiveOffer = createAsyncThunk("products/getProductExclusiveOffer", async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/products/exclusive-offer");
        return response.data;
    } catch (error) {
        throw error;
    }
})

const getProductBestSeller = createAsyncThunk("products/getProductBestSeller", async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/products/best-seller");
        return response.data;
    } catch (error) {
        throw error;
    }
})

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [] as ProductModel[],
        product: {} as ProductModel,
        productByCategory: [] as ProductModel[],
        productExclusiveOffer: [] as ProductModel[],
        productBestSeller: [] as ProductModel[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })
        .addCase(getProductById.fulfilled, (state, action) => {
            state.product = action.payload;
        })
        .addCase(getProductByCategoryId.fulfilled, (state, action) => {
            state.productByCategory = action.payload;
        })
        .addCase(getProductExclusiveOffer.fulfilled, (state, action) => {
            state.productExclusiveOffer = action.payload;
        })
        .addCase(getProductBestSeller.fulfilled, (state, action) => {
            state.productBestSeller = action.payload;
        })
    }
})

export default productSlice.reducer;
export { fetchProducts, getProductById , getProductByCategoryId, getProductBestSeller, getProductExclusiveOffer };