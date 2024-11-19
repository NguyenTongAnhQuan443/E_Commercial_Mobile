import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CategoryModel from "../../models/CategoryModel";

const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/category");
        return response.data;
    } catch (error) {
        throw error;
    }
})

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [] as CategoryModel[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        })
    }
})

export default categorySlice.reducer;
export { fetchCategories };

