"use client"

import React from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import LoginForm from "@/components/login/form/LoginForm";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const LoginPage: React.FC = () => {

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
            <Card className="shadow-lg max-w-md w-full">
            <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            Login
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LoginForm/>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Link href="/register">
                            <Button variant="link">
                                Don&apos;t have an account? Register
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
        </div>
    );
};

export default LoginPage;