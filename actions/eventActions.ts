"use server"

import axios, {AxiosResponse} from "axios";
import {API} from "@/lib/utils";
import {CalendarEvent} from "@/components/calendar/calendar-types";

export const getAllEvents = async () => {
    try {
        await axios.get(`${API}/api/events`);
    } catch (error) {
        console.log(error);
    }
}
export const getEvent = async (id: string): Promise<AxiosResponse | undefined> => {
    try {
        const res = await axios.get(`${API}/api/events/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const updateEvent = async (id: string, data: CalendarEvent, token: string) => {
    await axios.put(`${API}/api/events/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

}

export const deleteEvent = async (id: string, token: string) => {
    await axios.delete(`${API}/api/events/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
}

export const attendEvent = async (id: string, token: string) => {
    await axios.put(`${API}/api/events/attend/${id}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}