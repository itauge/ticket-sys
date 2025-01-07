import { usersSchema } from "@/validationSchemas/users";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";


export async function POST(req: NextRequest) {
    try {

    const body = await req.json();
    console.log('Request body:', body);
    const validation = usersSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const duplicate = await prisma.user.findFirst({
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

    console.log('Data to create:', body);

    return NextResponse.json(newUser, { status: 201 });

} catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create user." }, { status: 500 });
}
}