import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";


const Tickets = async () => {

  const tickets = await prisma.ticket.findMany();

  return (
    <div>
      <Link href="/tickets/new" className={buttonVariants({ variant: "default" })}>
        Create Ticket
      </Link> 
      <DataTable tickets={tickets} />
    </div>
  );
};

export default Tickets;