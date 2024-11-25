import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import OrderModel from "../../models/OrderModel";

import config from "../../config/config";
const createOrder = createAsyncThunk("orders/createOrder", async (order: OrderModel) => {
    try {
        const url = config.host + config.endpoints.createOrder
        const response = await axios.post(url, order);
        return response.data;
    } catch (error) {
        throw error;
    }
})

// const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
//     try {
//         const response = await axios.get("http://localhost:8080/api/orders");
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// })

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [] as OrderModel[],
        order: {} as OrderModel,
        errorResponse: "" as string,
    },
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.order = action.payload;
        })
        builder.addCase(createOrder.rejected, (state, action) => {
            state.errorResponse = action.error.message;
        })
    }
})

export default orderSlice.reducer;
export { createOrder };

