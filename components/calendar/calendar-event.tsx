import {CalendarEvent as CalendarEventType} from '@/components/calendar/calendar-types'
import {useCalendarContext} from '@/components/calendar/calendar-context'
import {format, isSameMonth} from 'date-fns'
import {capitalize, cn} from '@/lib/utils'
import {AnimatePresence, motion, MotionConfig} from 'framer-motion'
import {useRouter} from "next/navigation";

interface EventPosition {
  left: string
  width: string
  top: string
  height: string
}

function getOverlappingEvents(
  currentEvent: CalendarEventType,
  events: CalendarEventType[]
): CalendarEventType[] {
  return events.filter((event) => {
    if (event._id === currentEvent._id) return false
  })
}

function calculateEventPosition(
  event: CalendarEventType,
  allEvents: CalendarEventType[]
): EventPosition {
  const overlappingEvents = getOverlappingEvents(event, allEvents)
  const group = [event, ...overlappingEvents].sort(
    (a, b) =>new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  const position = group.indexOf(event)
  const width = `${100 / (overlappingEvents.length + 1)}%`
  const left = `${(position * 100) / (overlappingEvents.length + 1)}%`

  const startDate = new Date(event.date);
  const startHour = startDate.getHours();
  const startMinutes = startDate.getMinutes()
  const topPosition = startHour * 128 + (startMinutes / 60) * 128

  return {
    left,
    width,
    top: `${topPosition}px`,
    height: 'auto',
  }
}

export default function CalendarEvent({
  event,
  month = false,
  className,
}: {
  event: CalendarEventType
  month?: boolean
  className?: string
}) {
  const navigate = useRouter()
  const { events, setSelectedEvent, date } =
    useCalendarContext()
  const style = month ? {} : calculateEventPosition(event, events)

  // Generate a unique key that includes the current month to prevent animation conflicts
  const isEventInCurrentMonth = isSameMonth(event.date, date)
  const animationKey = `${event._id}-${
    isEventInCurrentMonth ? 'current' : 'adjacent'
  }`

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <motion.div
          className={cn(
            `px-3 py-1.5 rounded-md truncate cursor-pointer transition-all duration-300 bg-${event.color}-500/10 hover:bg-${event.color}-500/20 border border-${event.color}-500`,
            !month && 'absolute',
            className
          )}
          style={style}
          onClick={(e) => {
            e.stopPropagation()
            setSelectedEvent(event)
            navigate.push(`/events/${event._id}`)
          }}
          initial={{
            opacity: 0,
            y: -3,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
            transition: {
              duration: 0.15,
              ease: 'easeOut',
            },
          }}
          transition={{
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
            opacity: {
              duration: 0.2,
              ease: 'linear',
            },
            layout: {
              duration: 0.2,
              ease: 'easeOut',
            },
          }}
          layoutId={`event-${animationKey}-${month ? 'month' : 'day'}`}
        >
          <motion.div
            className={cn(
              `flex flex-col w-full text-${event.color}-500`,
              month && 'flex-row items-center justify-between'
            )}
            layout="position"
          >
            <p className={cn('font-bold truncate', month && 'text-xs')}>
              {capitalize(event.title)}
            </p>
            <p className={cn('text-sm', month && 'text-xs')}>
              <span>{format(event.date, 'h:mm a')}</span>
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
