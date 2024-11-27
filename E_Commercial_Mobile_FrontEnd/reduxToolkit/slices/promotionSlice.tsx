import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import PromotionModel from "../../models/Promotion";

import config from "../../config/config";
const fetchPromotions = createAsyncThunk("promotions/fetchPromotions", async () => {
    try {
        const url = config.host + config.endpoints.fetchPromotions
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
})

const promotionSlice = createSlice({
    name: "promotions",
    initialState: {
        promotions: [] as PromotionModel[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPromotions.fulfilled, (state, action) => {
            state.promotions = action.payload;
        })
    }
})

export default promotionSlice.reducer;
export { fetchPromotions };