import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { ticketSchema } from "@/validationSchemas/tickets";

interface Props {
    params: { id: string }
}

export async function PATCH(req: NextRequest, { params }: Props) {
    const body = await req.json()
    const validation = ticketSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const ticket = await prisma.ticket.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!ticket) {
        return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const updatedTicket = await prisma.ticket.update({
        where: { id: ticket.id},
        data: {...body},
    })

    return NextResponse.json(updatedTicket, { status: 200 })

}


export async function DELETE(req: NextRequest, { params }: Props) {

    const ticket = await prisma.ticket.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!ticket) {
        return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const deletedTicket = await prisma.ticket.delete({
        where: { id: ticket.id },
    })

    return NextResponse.json(deletedTicket, { status: 200 })
}
