import UserForm from "@/components/UserForm";
import DataTableSimple from "./data-table-simple";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";

const Users = async () => {

  const session = await getServerSession(options);

  const users = await prisma.user.findMany();

  if (session?.user.role !== "ADMIN") {
    return <p className="text-destructive">Unauthorized</p>
  }

  return (
    <div>
      <UserForm />
      <div className="my-8"/>
      <DataTableSimple users={users} />
    </div>
  )
};

export default Users;
