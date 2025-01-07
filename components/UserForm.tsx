"use client"

import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { usersSchema } from "@/validationSchemas/users";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "./ui/select";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";


type UserFormData = z.infer<typeof usersSchema>

interface Props {
    user?: User
}

const UserForm = ({ user }: Props) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState("");
    const router = useRouter();

    const form = useForm<UserFormData>({
        resolver: zodResolver(usersSchema),
    })

    async function onSubmit(values: z.infer<typeof usersSchema>) {
        try {
            setIsSubmitting(true);
            setError("");
            console.log("submitting");
            if (user) {
                await axios.patch(`/api/users/${user.id}`, values);

            }else{
                await axios.post("/api/users", values);
            }

            router.push("/tickets");
            router.refresh();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch(error) {
            setError("Failed to create user");
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
                        name="username" 
                        defaultValue={user?user.username:""}
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter User full name..." {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <FormField 
                        control={form.control} 
                        name="password" 
                        defaultValue=""
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" required={user? false:true} placeholder="Enter password..." {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    {user && (
                        <FormField 
                            control={form.control} 
                            name="email" 
                            defaultValue={user?user.email:""}
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter email..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    )}

                    <div className= "flex w-full space-x-4">
                        <FormField 
                            control={form.control} 
                            name="role" 
                            defaultValue={user?user.role:"USER"}
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>User Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue 
                                            placeholder="Role..." 
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USER">User</SelectItem>
                                        <SelectItem value="TECH">Tech</SelectItem>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                        />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="mt-4">
                        {user ? "Update User" : "Create User"}
                    </Button>
                </form>
            </Form>
            <p className="text-destructive">{error}</p>
        </div>
    )
}

export default UserForm;