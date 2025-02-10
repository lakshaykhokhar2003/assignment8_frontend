"use client"
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {CalendarEvent} from "@/components/calendar/calendar-types";
import {capitalize, dateConverter, randomImageChooser, SOCKET} from "@/lib/utils";
import useStore from "@/hooks/use-store";
import {Pencil} from "lucide-react";
import EditEvent from "@/components/events/EditEvent";
import useEvent from "@/hooks/use-event";
import {io} from "socket.io-client";

const SingleEvent = ({event: initialEvent}: { event: CalendarEvent }) => {
    const [isClient, setIsClient] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [event, setEvent] = useState(initialEvent);
    const {user} = useStore();
    const {attend} = useEvent();

    const handleClose = () => setIsEditing(false);

    useEffect(() => {
        setIsClient(true);

        const socket = io(SOCKET);

        socket.on("updateEvent", (updateDescription) => {
            const updatedFields = updateDescription.updatedFields;
            setEvent((prevEvent) => {
                const updatedEvent = {...prevEvent};

                for (const key in updatedFields) {
                    if (key.startsWith("attendees.")) {
                        const index = parseInt(key.split(".")[1], 10);

                        if (!updatedEvent.attendees) updatedEvent.attendees = [];
                        updatedEvent.attendees[index] = updatedFields[key];
                    } else {
                        updatedEvent[key] = updatedFields[key];
                    }
                }

                return updatedEvent;
            });
        })

        return () => {
            socket.disconnect();
        };
    }, [event._id]);

    if (!isClient) return null;

    const isAdmin = user?.name === event.createdBy?.name;
    const isAttending = event.attendees?.some(attendee =>
        typeof attendee === "string"
            ? attendee === user?._id
            : attendee?._id === user?._id
    )


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black p-6">
            <div className="max-w-2xl mx-auto py-12">
                <div className="relative h-48 w-full">
                    <Image
                        src={randomImageChooser() || "https://placehold.co/600x400"}
                        alt={event.title}
                        className="w-full h-full object-cover rounded-t-lg"
                        width={1080}
                        height={1920}
                    />
                </div>
                <Card className="shadow-lg dark:shadow-gray-800">
                    <CardHeader>
                        <CardTitle
                            className="flex justify-between items-center text-2xl font-bold text-gray-900 dark:text-gray-100 cursor-pointer">
                            {capitalize(event.title)}
                            {isAdmin && <Pencil className="inline-block text-red-500 hover:text-red-600"
                                                onClick={() => setIsEditing(true)}/>}
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            Created by {event.createdBy?.name} on {dateConverter(event.date as Date)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {event.attendees?.length} people attending
                        </div>
                        {(!isAdmin && !isAttending) && (
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 text-white"
                                onClick={() => attend(event._id as string)}
                            >
                                Attend Event
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
            {isEditing && <EditEvent open={isEditing} event={event} close={handleClose}/>}
        </div>
    );
};

export default SingleEvent;