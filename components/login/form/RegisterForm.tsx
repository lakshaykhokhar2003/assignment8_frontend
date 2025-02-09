"use client"
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegisterFormData, registerSchema} from "@/components/login/authSchema";
import {InputField} from "@/components/login/InputField";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {API, toastNotification} from "@/lib/utils";
import {useRouter} from "next/navigation";

const RegisterForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });
    const navigate = useRouter()

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const res = await axios.post(`${API}/api/auth/register`, data)
            if (res?.status === 201) toastNotification({type: "success", message: "Registration successful",})
            navigate.push('/login')
            reset()
        } catch (error) {
            console.log(error)
            toastNotification({type: "error", message: "Registration failed, please try again later",})
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputField
                label="Name"
                type="text"
                id="name"
                placeholder="Enter your name"
                register={register}
                errors={errors}
            />
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
                Register
            </Button>
        </form>
    );
};

export default RegisterForm;