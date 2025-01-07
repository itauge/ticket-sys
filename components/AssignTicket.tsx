"use client"

import { Ticket } from "@prisma/client";
import { User } from "@prisma/client";
import { useState } from "react";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const AssignTicket = ({ticket, users}: {ticket: Ticket, users: User[]}) => {
    const [isAssigning, setIsAssigning] = useState(false);
    const [error, setError] = useState("");

    const assignTicket = async (userId: string) => {
        setError("");
        setIsAssigning(true);
        await axios.patch(`/api/tickets/${ticket.id}`, {
            assignedToUserId: userId === "0" ? null : userId
        }).catch(() => {
            setError("Failed to assign ticket");
            console.log(error);
        }).finally(() => {
            setIsAssigning(false);
        });
    }


    return (
        <div>
            <Select 
            defaultValue={ticket.assignedToUserId?.toString() || "0"}
            onValueChange={assignTicket}
            disabled={isAssigning}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Assign to" defaultValue={ticket.assignedToUserId?.toString() || "0"}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Unassigned</SelectItem>
                    {users.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>{user.username}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default AssignTicket;