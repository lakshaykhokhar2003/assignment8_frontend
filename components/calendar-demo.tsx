'use client'

import { useEffect, useState } from 'react';
import Calendar from './calendar/calendar';
import { CalendarEvent, Mode } from './calendar/calendar-types';
import {SOCKET} from '@/lib/utils';
import io from "socket.io-client";


const socket = io(SOCKET, { autoConnect: false });

const CalendarDemo = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [mode, setMode] = useState<Mode>('month');
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.emit("getEvents", (initialEvents: CalendarEvent[]) => {
      setEvents(initialEvents);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
      <Calendar
          events={events}
          setEvents={setEvents}
          mode={mode}
          setMode={setMode}
          date={date}
          setDate={setDate}
      />
  );
}

export default CalendarDemo;