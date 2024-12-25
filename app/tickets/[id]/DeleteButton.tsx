'use client'

import {buttonVariants } from "@/components/ui/button";
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
  } from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";


const DeleteButton = ({ ticketId }: { ticketId: number }) => {

    const router = useRouter()
    const [error, setError] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await axios.delete(`/api/tickets/${ticketId}`)
            router.push("/tickets")
            router.refresh()
        } catch (error) {
            setIsDeleting(false)
            setError(true)
            console.error('Failed to delete ticket', error)
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className={buttonVariants({ variant: "destructive"})}>Delete Ticket</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your ticket
                        </AlertDialogDescription>
                    </AlertDialogHeader>    
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>{isDeleting? 'Deleting...': 'Delete'}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <p className="text-destructive">{error ? 'Failed to delete ticket. Please try again.' : ''}</p>
        </>
    )
}

export default DeleteButton;