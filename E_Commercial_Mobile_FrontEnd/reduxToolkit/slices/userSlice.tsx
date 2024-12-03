import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserModel from "../../models/UserModel";

// Định nghĩa kiểu dữ liệu cho state
interface UserState {
    user: UserModel | null;
    isAuthenticated: boolean;
}

// Initial state của user
const initialState: UserState = {
    user: null,  // Ban đầu chưa có người dùng
    isAuthenticated: false,  // Ban đầu chưa đăng nhập
};

// Slice cho user
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Action để đăng nhập người dùng và lưu thông tin vào state
        login: (state, action: PayloadAction<UserModel>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        // Action để đăng xuất người dùng và xóa thông tin khỏi state
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        // Action để cập nhật thông tin người dùng
        updateUser: (state, action: PayloadAction<UserModel>) => {
            state.user = action.payload;
        },
    },
});

// Export các action và reducer
export const { login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
