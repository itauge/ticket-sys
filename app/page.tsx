import DashChart from "@/components/DashChart";
import DashRecentTicket from "@/components/DashRecentTicket";
import prisma from "@/prisma/db";


export default async function Home() {

  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: {
        status: "CLOSED"
      },
    },
    orderBy: {
      updatedAt: "desc"
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true
    }
  });

  const groupTicket = await prisma.ticket.groupBy({
    by: ["status"],
    _count: {
      id: true
    }
  });

  const data = groupTicket.map((item) => ({
    name: item.status,
    value: item._count.id
  }));

  return (
    <div>
      <div className= "grid gap-4 md:grid-cols-2 px-2">
        <div>
          <DashRecentTicket tickets={tickets} />
        </div>
        <div>
          <DashChart data={data} />
        </div>
      </div>
    </div>
  );
}
