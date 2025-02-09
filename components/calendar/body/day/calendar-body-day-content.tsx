import { useCalendarContext } from '../../calendar-context'
import { isSameDay } from 'date-fns'
import { hours } from './calendar-body-margin-day-margin'
import CalendarBodyHeader from '../calendar-body-header'
import CalendarEvent from '../../calendar-event'

export default function CalendarBodyDayContent({ date }: { date: Date }) {
  const { events } = useCalendarContext()
    console.log("date",date)

    const dayEvents = events.filter((event) => isSameDay(event.date, date))
    console.log("events", dayEvents)

  return (
    <div className="flex flex-col flex-grow">
      <CalendarBodyHeader date={date} />

      <div className="flex-1 relative">
        {hours.map((hour) => (
          <div key={hour} className="h-32 border-b border-border/50 group" />
        ))}

        {dayEvents.map((event) => (
          <CalendarEvent key={event._id} event={event} />
        ))}
      </div>
    </div>
  )
}
