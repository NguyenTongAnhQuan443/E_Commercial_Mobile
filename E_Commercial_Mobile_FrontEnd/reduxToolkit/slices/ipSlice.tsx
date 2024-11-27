import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Network from 'expo-network';
import { Platform } from "react-native";

const fetchIp = createAsyncThunk("ip/fetchIp", async () => {
    try {
        const isSimulator = Platform.OS === 'ios' || Platform.OS === 'android';
        const ip = await Network.getIpAddressAsync();
        if (!isSimulator) {
            return 'http://localhost:8080';
        } else {
            return `http://${ip}:8080`;
        }
    } catch (error) {
        throw error;
    }
})

const ipSlice = createSlice({
    name: "ip",
    initialState: {
        ipAddress: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIp.fulfilled, (state, action) => {
            state.ipAddress = action.payload;
        })
    }
})

export default ipSlice.reducer;
export { fetchIp };