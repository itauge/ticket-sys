import prisma from "@/prisma/db";
import { usersSchema } from "@/validationSchemas/users";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

interface Props {
    params: { id: string }
}

export async function PATCH(req: NextRequest, { params }: Props) {
    const body = await req.json();
    const validation = usersSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!user) {
        return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    if(body?.password && body.password != "") {
        const hashPassword = await bcrypt.hash(body.password, 10);
        body.password = hashPassword;
    }else{
        delete body.password;
    }

    if(user.username !== body.username) {
        const duplicate = await prisma.user.findUnique({
            where: { username: body.username},
        });

        if(duplicate) {
            return NextResponse.json({ message: "Username already exists." }, { status: 409 });
        }
    }

    const updatedUser = await prisma.user.update({
        where: { id: parseInt(params.id) },
        data: {...body}
    });

    return NextResponse.json(updatedUser, { status: 200 });
}
