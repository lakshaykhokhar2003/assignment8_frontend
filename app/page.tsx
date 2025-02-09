import CalendarDemo from '@/components/calendar-demo'
import {API} from "@/lib/utils";

export default function Home() {
  console.log(`${API}/api/events/`)

  return <CalendarDemo />
}
