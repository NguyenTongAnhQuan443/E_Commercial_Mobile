import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import OrderModel from "../../models/OrderModel";

const createOrder = createAsyncThunk("orders/createOrder", async (order: OrderModel) => {
    try {
        const response = await axios.post("http://localhost:8080/api/order", order);
        return response.data;
    } catch (error) {
        throw error;
    }
})

// const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
//     try {
//         const response = await axios.get("http://localhost:8080/api/order");
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

