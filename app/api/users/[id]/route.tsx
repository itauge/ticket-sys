import prisma from "@/prisma/db";
import { usersSchema } from "@/validationSchemas/users";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
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

    const body = await req.json();
    const validation = usersSchema.safeParse(body);
    const { id } = await params;

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { id: Number(id) }
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
        where: { id: Number(id) },
        data: {...body}
    });

    return NextResponse.json(updatedUser, { status: 200 });
}
