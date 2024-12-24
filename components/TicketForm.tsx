"use client"

import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { ticketSchema } from "@/validationSchemas/tickets";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "./ui/select";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


type TicketFormData = z.infer<typeof ticketSchema>

const TicketForm = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();


    const form = useForm<TicketFormData>({
        resolver: zodResolver(ticketSchema),
    })

    async function onSubmit(values: z.infer<typeof ticketSchema>) {
        try {
            setIsSubmitting(true);
            setError("");
            await axios.post("/api/tickets", values);
            router.push("/tickets");
            router.refresh();
        } catch(error) {
            setError("Failed to create ticket");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="rounded-md border w-full p-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField 
                        control={form.control} 
                        name="title" 
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>Ticket Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Ticket Title..." {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <Controller name="description" control={form.control} render={({field}) => (
                        <SimpleMDE placeholder="Ticket Description..." {...field} />
                    )}
                    />
                    <div className= "flex w-full space-x-4">
                        <FormField control={form.control} name="status" render={({field}) => (
                            <FormItem>
                                <FormLabel>Ticket Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="OPEN">Open</SelectItem>
                                        <SelectItem value="STARTED">Started</SelectItem>
                                        <SelectItem value="CLOSED">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                        />
                    <FormField control={form.control} name="priority" render={({field}) => (
                            <FormItem>
                                <FormLabel>Ticket Priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Priority..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LOW">Low</SelectItem>
                                        <SelectItem value="MEDIUM">Medium</SelectItem>
                                        <SelectItem value="HIGH">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                        />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="mt-4">Create Ticket</Button>
                </form>
            </Form>
        </div>
    )
}

export default TicketForm;