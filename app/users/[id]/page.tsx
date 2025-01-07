import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";


interface Props {
    params: { id: string }
}

const UserPage = async ({ params }: Props) => {


    const user = await prisma?.user.findUnique({
        where: { id: parseInt(params.id) }
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