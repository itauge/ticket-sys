import { ticketSchema } from "@/validationSchemas/tickets";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const validation = ticketSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const ticket = await prisma.ticket.create({
        data: {...body}
    })

    return NextResponse.json(ticket, { status: 201 })

}