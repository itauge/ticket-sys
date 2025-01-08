import options from "@/app/api/auth/[...nextauth]/options";
import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";


interface Props {
    params: { id: string }
}

const UserPage = async ({ params }: Props) => {

    const session = await getServerSession(options);

    if (session?.user.role !== "ADMIN") {
        return <p className="text-destructive">Unauthorized</p>
    }

    const { id } = await params;

    const user = await prisma?.user.findUnique({
        where: { id: Number(id) }
    });

    if(!user) {
        return <p className="text-destructive">User not found</p>
    }

    user.password = "";
    return (
        <UserForm user={user}/>
    )
}

export default UserPage;