import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ProductModel from "../../models/ProductModel";
import { Platform } from "react-native";

// Kiểm tra môi trường để chọn host
const isSimulator = Platform.OS === 'ios' || Platform.OS === 'android';
const host = !isSimulator ? 'http://localhost:8080' : 'http://192.168.0.75:8080';  // Tùy vào thiết bị giả lập hay thật

// Các endpoint
const endPoints = {
    fetchProducts: '/api/products',
    getProductById: '/api/products/',
    getProductByCategoryId: '/api/products/by-category/',
    getProductExclusiveOffer: '/api/products/exclusive-offer',
    getProductBestSeller: '/api/products/best-seller',
};

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    try {
        const response = await axios.get(host + endPoints.fetchProducts);
        return response.data;

    } catch (error) {
        throw error;
    }
});

const getProductById = createAsyncThunk("products/getProductById", async (id: number) => {
    try {
        const response = await axios.get(`${host}${endPoints.getProductById}${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

const getProductByCategoryId = createAsyncThunk("products/getProductByCategoryId", async (id: number) => {
    try {
        const response = await axios.get(`${host}${endPoints.getProductByCategoryId}${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

const getProductExclusiveOffer = createAsyncThunk("products/getProductExclusiveOffer", async () => {
    try {
        const response = await axios.get(host + endPoints.getProductExclusiveOffer);
        return response.data;
    } catch (error) {
        throw error;
    }
});

const getProductBestSeller = createAsyncThunk("products/getProductBestSeller", async () => {
    try {
        const response = await axios.get(host + endPoints.getProductBestSeller);
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
