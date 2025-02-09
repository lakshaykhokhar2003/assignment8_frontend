import {Button} from '@/components/ui/button'
import {Plus} from 'lucide-react'
import {useCalendarContext} from '../../calendar-context'
import {toastNotification} from "@/lib/utils";
import useEvent from "@/hooks/use-event";

export default function CalendarHeaderActionsAdd() {
    const {jwtVerify} = useEvent()
    const {setNewEventDialogOpen} = useCalendarContext()

    const handleAddEvent = async () => {
        const res = await jwtVerify();
        if (!res || res.status !== 200) return toastNotification({ type: "error", message: "Please login to add event" });
        setNewEventDialogOpen(true)
    }
    return (
        <Button
            className="flex items-center gap-1 bg-primary text-background"
            onClick={handleAddEvent}
        >
            <Plus/>
            Add Event
        </Button>
    )
}
