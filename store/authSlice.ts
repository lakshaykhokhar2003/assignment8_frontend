import { setCookie, deleteCookie } from 'cookies-next';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {UserProps} from "@/types";

interface AuthState {
    token: string | null;
    user: UserProps | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (
            state,
            action: PayloadAction<{ token: string; user: UserProps }>
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            setCookie('isAuth', 'true')
        },
        clearAuth: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            deleteCookie('isAuth')
        },
    },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;