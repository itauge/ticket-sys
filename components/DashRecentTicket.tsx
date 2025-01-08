import { Prisma } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TicketStatusBadge from "./TicketStatusBadge";
import Link from "next/link";
import TicketPriority from "./TicketPriority";

type TicketWithUser = Prisma.TicketGetPayload<{
    include: {
        assignedToUser: true;
    }
}>;

interface Props {
    tickets: TicketWithUser[];
}

const DashRecentTicket = ({ tickets }: Props) => {
    return (
    <Card>
        <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>   
        </CardHeader>
        <CardContent>
            <div className="space-y-8">
                {tickets? tickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center">
                        <TicketStatusBadge status={ticket.status} />
                        <div className="ml-4 space-y-1">
                            <Link href={`/tickets/${ticket.id}`}>
                                <p>{ticket.title}</p>
                                <p>{ticket.assignedToUser?.username || "Unassigned"}</p>
                            </Link>
                        </div>
                        <div className="ml-auto font-medium">
                            <TicketPriority priority={ticket.priority} />
                        </div>
                    </div>
                )) : <p>No tickets found</p>}
            </div>
        </CardContent>
    </Card>
    )
}

export default DashRecentTicket;