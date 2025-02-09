"use client"
import React from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import RegisterForm from "@/components/login/form/RegisterForm";

const RegisterPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
                <Card className="shadow-lg max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            Register
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm/>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Link href="/login">
                            <Button variant="link">
                                Already have an account? Login
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
        </div>
    );
};

export default RegisterPage;