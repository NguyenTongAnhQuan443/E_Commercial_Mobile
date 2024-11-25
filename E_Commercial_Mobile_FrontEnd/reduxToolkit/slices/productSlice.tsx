import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ProductModel from "../../models/ProductModel";
import { Platform } from "react-native";
import config from "../../config/config";

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    try {
        const response = await axios.get(config.host + config.endpoints.fetchProducts);
        return response.data;

    } catch (error) {
        throw error;
    }
});

const getProductById = createAsyncThunk("products/getProductById", async (id: number) => {
    try {
        const response = await axios.get(`${config.host}${config.endpoints.getProductById}${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

const getProductByCategoryId = createAsyncThunk("products/getProductByCategoryId", async (id: number) => {
    try {
        const response = await axios.get(`${config.host}${config.endpoints.getProductByCategoryId}${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

const getProductExclusiveOffer = createAsyncThunk("products/getProductExclusiveOffer", async () => {
    try {
        const response = await axios.get(config.host + config.endpoints.getProductExclusiveOffer);
        return response.data;
    } catch (error) {
        throw error;
    }
});

const getProductBestSeller = createAsyncThunk("products/getProductBestSeller", async () => {
    try {
        const response = await axios.get(config.host + config.endpoints.getProductBestSeller);
        return response.data;
    } catch (error) {
        throw error;
    }
});

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
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
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
            });
    },
});

export default productSlice.reducer;
export {
    fetchProducts,
    getProductById,
    getProductByCategoryId,
    getProductBestSeller,
    getProductExclusiveOffer,
};
