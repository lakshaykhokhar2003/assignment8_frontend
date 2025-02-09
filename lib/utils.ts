import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {toast} from "sonner";

export type toastProps = {
    type: 'success' | 'error' | 'info' | 'warning',
    message: string
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const toastNotification = ({type, message}: toastProps) => toast[type](message)

export const capitalize = (str: string | undefined) => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const dateConverter = (date: Date) => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
})

export const randomImageChooser = () => {
    const images = [
        '/events/buzzing-city.jpg',
        '/events/laptop-on-desk.jpg',
        '/events/park.jpg',
        '/events/meeting-networking.jpg',
        '/events/women-coding.jpg'
    ]
    return images[Math.floor(Math.random() * images.length)]
}

export const API = process.env.NEXT_PUBLIC_API_URL
export const SOCKET = process.env.NEXT_PUBLIC_SOCKET_URL