import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { Status } from "@prisma/client";

//searchParams is actually a promise that need awaited
interface Props {
  searchParams: Promise<{
    status: Status;
    page: string;
  }>
}

const Tickets = async ({ searchParams }: Props) => {
  const pageSize = 10;
  const params = await searchParams;
  
  const page = params.page ? parseInt(params.page) : 1;
  
  const statuses = Object.values(Status);
  const status = statuses.includes(params.status) ? params.status : undefined;

  let where = {};
  if (status) {
    where = { status };
  } else {
    where = {
      NOT: {
        status: "CLOSED" as Status
      }
    };
  }

  const ticketCount = await prisma.ticket.count({ where });
  const tickets = await prisma.ticket.findMany({
    where,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div>
      <div className="flex gap-2">
        <Link href="/tickets/new" className={buttonVariants({ variant: "default" })}>
          Create Ticket
        </Link> 
        <StatusFilter />
      </div>
      <DataTable tickets={tickets} />
      <Pagination itemCount={ticketCount} pageSize={pageSize} currentPage={page} />
    </div>
  );
};

export default Tickets;