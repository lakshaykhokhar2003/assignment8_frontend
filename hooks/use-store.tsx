"use client"

import {toastNotification} from "@/lib/utils";
import {UserProps} from "@/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {clearAuth, setAuth} from "@/store/authSlice";
import {useRouter} from "next/navigation";

const useStore = () => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated)
    const token = useSelector((state: RootState) => state.auth.token)
    const user = useSelector((state: RootState) => state.auth.user)

    const dispatch = useDispatch()
    const navigate = useRouter()

    const login = (data: { token: string; user: UserProps }) => {
        dispatch(setAuth(data))
        toastNotification({type: "info", message: "Login successful"})
        navigate.push('/')
    }

    const logout = () => {
        dispatch(clearAuth())
        toastNotification({type: "info", message: "Logout successful",})
        navigate.push('/')
    }

    return {isAuth, token, user, login, logout}
}

export default useStore;