"use client"

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from '@/components/ui/dialog'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {DateTimePicker} from '@/components/form/date-time-picker'
import {ColorPicker} from '@/components/form/color-picker'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {CalendarEvent} from "@/components/calendar/calendar-types";
import {toastNotification} from "@/lib/utils";
import useStore from "@/hooks/use-store";
import {deleteEvent, updateEvent} from "@/actions/eventActions";
import {useRouter} from "next/navigation";

const formSchema = z
    .object({
        title: z.string().min(1, 'Title is required'),
        date: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: 'Invalid start date',
        }),
        description: z.string().min(1, 'Description is required'),
        color: z.string(),
    })

const EditEvent = ({event, open, close}: {
    event: CalendarEvent,
    open: boolean,
    close: () => void
}) => {
    const navigate = useRouter()
    const {token} = useStore()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: event.title,
            date: new Date(event.date).toISOString(),
            description: event.description,
            color: event.color,
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const updatedEvent = {
                ...event,
                title: values.title,
                date: values.date,
                description: values.description,
                color: values.color,
            }
            await updateEvent(event._id as string, updatedEvent, token as string)
            toastNotification({type: "success", message: "Event updated successfully",})
            close()
            navigate.push('/')
        } catch (error) {
            console.log(error)
            toastNotification({type: "error", message: "Error updating event, please try again later",})
        }

    }

    const deleteHandler = async () => {
        try {
            await deleteEvent(event._id as string, token as string)
            toastNotification({type: "success", message: "Event deleted successfully",})
            close()
            navigate.push('/')
        } catch (error) {
            console.log(error)
            toastNotification({type: "error", message: "Error deleting event, please try again later",})
        }
    }


    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manage event</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Event title" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Event description" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Date</FormLabel>
                                    <FormControl>
                                        <DateTimePicker field={field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/*<FormField*/}
                        {/*  control={form.control}*/}
                        {/*  name="end"*/}
                        {/*  render={({ field }) => (*/}
                        {/*    <FormItem>*/}
                        {/*      <FormLabel className="font-bold">End</FormLabel>*/}
                        {/*      <FormControl>*/}
                        {/*        <DateTimePicker field={field} />*/}
                        {/*      </FormControl>*/}
                        {/*      <FormMessage />*/}
                        {/*    </FormItem>*/}
                        {/*  )}*/}
                        {/*/>*/}

                        <FormField
                            control={form.control}
                            name="color"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Color</FormLabel>
                                    <FormControl>
                                        <ColorPicker field={field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="flex justify-between gap-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" type="button">
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete event</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete this event? This action
                                            cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={deleteHandler}>
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <Button type="submit">Update event</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditEvent;