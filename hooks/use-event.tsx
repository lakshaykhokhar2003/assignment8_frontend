import useStore from "@/hooks/use-store";
import axios, {AxiosResponse} from "axios";
import {API, toastNotification} from "@/lib/utils";

const useEvent = () => {
    const {token} = useStore()

    const createEvent = async (newEvent: {
        title: string,
        date: Date,
        description: string,
        color: string
    }): Promise<void> => {

        const res = await axios.post(`${API}/api/events`, newEvent, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (res?.status === 201) toastNotification({type: "success", message: "Event added successfully"})
    }

    const jwtVerify = async (): Promise<AxiosResponse<{ token: string }> | undefined> => {
        if (!token) {
            toastNotification({type: "error", message: "Please login to add event"});
            return undefined;
        }

        try {
            const res: AxiosResponse<{
                token: string
            }> = await axios.post(`${API}/api/auth/verify`, {token});
            return res;
        } catch (error) {
            console.log(error);
            toastNotification({type: "error", message: "Verification failed"});
            return undefined;
        }
    };

    const attend = async (id: string): Promise<void> => {
        try {
            const res = await axios.put(`${API}/api/events/attend/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res?.status === 200) toastNotification({type: "success", message: "Attending event"})
        } catch (error) {
            console.log(error)
            toastNotification({type: "error", message: "Error attending event"})
        }
    }


    return {createEvent, jwtVerify, attend}
}

export default useEvent;