import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { ticketPatchSchema } from "@/validationSchemas/tickets";
import options from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

interface Props {
    params: { id: string }
}

export async function PATCH(req: NextRequest, { params }: Props) {

    const session = await getServerSession(options);
    
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json()
    const validation = ticketPatchSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const ticket = await prisma.ticket.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!ticket) {
        return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    if (body?.assignedToUserId) {
        body.assignedToUserId = parseInt(body.assignedToUserId);
    }

    const updatedTicket = await prisma.ticket.update({
        where: { id: ticket.id},
        data: {...body},
    })

    return NextResponse.json(updatedTicket, { status: 200 })

}


export async function DELETE(req: NextRequest, { params }: Props) {    
    const session = await getServerSession(options);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
