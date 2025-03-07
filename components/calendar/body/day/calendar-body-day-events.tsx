"use client"
import { useCalendarContext } from '../../calendar-context'
import { isSameDay } from 'date-fns'
import {useRouter} from "next/navigation";

export default function CalendarBodyDayEvents() {
    const navigate = useRouter()
  const { events, date, setSelectedEvent } = useCalendarContext()
  const dayEvents = events.filter((event) => isSameDay(event.date, date))

  return !!dayEvents.length ? (
    <div className="flex flex-col gap-2">
      <p className="font-medium p-2 pb-0 font-heading">Events</p>
      <div className="flex flex-col gap-2">
        {dayEvents.map((event,index) => (
          <div
            key={(event._id as string)+index}
            className="flex items-center gap-2 px-2 cursor-pointer"
            onClick={() => {
              setSelectedEvent(event)
                navigate.push(`/events/${event._id}`)
              // setManageEventDialogOpen(true)
            }}
          >
            <div className="flex items-center gap-2">
              <div className={`size-2 rounded-full bg-${event.color}-500`} />
              <p className="text-muted-foreground text-sm font-medium">
                {event.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="p-2 text-muted-foreground">No events today...</div>
  )
}
