import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const loadState = () => {
    try {
        if (typeof window === "undefined") return undefined;
        const serializedState = localStorage.getItem("reduxState");
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        console.error("Error loading state from localStorage:", err);
        return undefined;
    }
};

const saveState = (state: RootState) => {
    try {
        if (typeof window === "undefined") return;
        const serializedState = JSON.stringify(state);
        localStorage.setItem("reduxState", serializedState);
    } catch (err) {
        console.error("Error saving state to localStorage:", err);
    }
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    preloadedState: loadState(),
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;