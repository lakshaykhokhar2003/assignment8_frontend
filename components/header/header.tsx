"use client"

import React, {Fragment, useEffect} from 'react'
import {ThemeToggle} from './theme-toggle'
import {Button} from "@/components/ui/button";
import useStore from "@/hooks/use-store";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from '@/components/ui/dropdown-menu'
import Link from "next/link";
import {capitalize} from "@/lib/utils";

const Header = () => {
    const [isClient, setIsClient] = React.useState(false);
    const {isAuth, user, logout} = useStore();
    const firstLetter = user?.name.charAt(0).toUpperCase()
    const name = capitalize(user?.name)

    useEffect(() => setIsClient(true), []);

    return (
        <div className="flex items-center justify-between p-2 w-full border-b">
            <Link href="/">
                <h1 className="text-lg font-bold">
                    Event Management Platform
                </h1>
            </Link>

            <div className="flex items-center gap-2">
                <ThemeToggle/>

                {!isClient ? (
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                ) :  isAuth ? <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer dark:bg-white dark:text-black">
                            <AvatarFallback
                                className="w-10 h-10 dark:text-white dark:bg-black dark:border-1 dark:border-gray-500">{firstLetter}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem disabled>
                            <p>{name}</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>
                            <p>{user?.email}</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logout} className="cursor-pointer">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> : <Fragment>
                    <Link href="/login">
                        <Button variant="ghost">
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="ghost">
                            Register
                        </Button>
                    </Link>
                </Fragment>}
            </div>
        </div>
    )
}

export default Header;