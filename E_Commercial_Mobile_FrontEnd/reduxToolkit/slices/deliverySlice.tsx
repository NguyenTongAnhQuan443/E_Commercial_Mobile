import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import DeliveryMethodModel from "../../models/DeliveryMethodModel";

const fetchDeliveryMethods = createAsyncThunk("delivery/fetchDeliveryMethods", async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/delivery-method");
        return response.data;
    } catch (error) {
        throw error;
    }
})

const deliverySlice = createSlice({
    name: "delivery",
    initialState: {
        deliveryMethods: [] as DeliveryMethodModel[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDeliveryMethods.fulfilled, (state, action) => {
            state.deliveryMethods = action.payload;
        })
    }
})

export default deliverySlice.reducer;
export { fetchDeliveryMethods };