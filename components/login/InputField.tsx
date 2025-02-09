"use client"
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Eye, EyeOff} from "lucide-react";

interface InputFieldProps {
    label: string;
    type: string;
    id: string;
    placeholder: string;
    register: any;
    errors: any;
}

export const InputField: React.FC<InputFieldProps> = ({label, type, id, placeholder, register, errors,}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                <Input
                    type={type === "password" && showPassword ? "text" : type}
                    id={id}
                    placeholder={placeholder}
                    {...register(id)}
                    className={errors[id] ? "border-red-500 pr-10" : "pr-10"}
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5"/>
                        ) : (
                            <Eye className="h-5 w-5"/>
                        )}
                    </button>
                )}
            </div>
            {errors[id] && (
                <p className="text-sm text-red-500">{errors[id].message}</p>
            )}
        </div>
    );
};
