import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import PaymentMethodModel from "../../models/PaymentMethodModel";

const fetchPaymentMethods = createAsyncThunk("paymentMethods/fetchPaymentMethods", async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/payment-method");
        return response.data;
    } catch (error) {
        throw error;
    }
})

const paymentSlice = createSlice({
    name: "paymentMethods",
    initialState: {
        paymentMethods: [] as PaymentMethodModel[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPaymentMethods.fulfilled, (state, action) => {
            state.paymentMethods = action.payload;
        })
    }
})

export default paymentSlice.reducer;
export { fetchPaymentMethods };