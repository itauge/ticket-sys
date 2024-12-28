import { usersSchema } from "@/validationSchemas/users";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";


export async function POST(req: NextRequest) {

    const body = await req.json();
    const validation = usersSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const duplicate = await prisma.user.findUnique({
        where: { username: body.username },
    });

    if (duplicate) {
        return NextResponse.json( { message: "Username already exists." }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(body.password, 10);

    body.password = hashPassword;

    const newUser = await prisma.user.create({
        data: {...body},
    });

    return NextResponse.json(newUser, { status: 201 });


}