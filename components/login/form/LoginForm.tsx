"use client"
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginFormData, loginSchema} from "@/components/login/authSchema";
import {InputField} from "@/components/login/InputField";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {API, toastNotification} from "@/lib/utils";
import useStore from "@/hooks/use-store";

const LoginForm: React.FC = () => {
    const {login} = useStore()
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await axios.post(`${API}/api/auth/login`, data)
            if (res?.status === 200) login({token: res.data.token, user: res.data.user})
            reset()
        } catch (error) {
            console.log(error)
            toastNotification({type: "error", message: "Login failed, please try again later",})
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputField
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
                register={register}
                errors={errors}
            />
            <InputField
                label="Password"
                type="password"
                id="password"
                placeholder="Enter your password"
                register={register}
                errors={errors}
            />
            <Button type="submit" className="w-full">
                Login
            </Button>
        </form>
    );
};

export default LoginForm;