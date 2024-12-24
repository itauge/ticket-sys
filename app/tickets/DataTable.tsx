import TicketPriority from "@/components/TicketPriority";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import { Table, TableRow, TableHeader, TableHead, TableBody, TableCell   } from "@/components/ui/table";
import { Ticket } from "@prisma/client";

interface Props {
  tickets: Ticket[];
}

const DataTable = ({ tickets }: Props) => {

  return (
    <div className="w-full mt-5">
        <div className="rounded-md sm:border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>
                            <div className="flex justify-center">
                                Status
                            </div>
                        </TableHead>
                        <TableHead>
                            <div className="flex justify-center">
                                Priority
                            </div>
                        </TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets ? tickets.map((ticket) => (
                        <TableRow key={ticket.id} data-href ={`/tickets/${ticket.id}`}>
                            <TableCell>{ticket.title}</TableCell>
                            <TableCell>{ticket.description}</TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <TicketStatusBadge status={ticket.status} />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <TicketPriority priority={ticket.priority} />
                                </div>
                            </TableCell>
                            <TableCell>{ticket.createdAt.toLocaleDateString("ja-JP", {
                                year: "2-digit",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })}</TableCell>
                        </TableRow>
                    )) : <TableRow><TableCell>No tickets found</TableCell></TableRow>}
                </TableBody>
            </Table>
        </div>
    </div>
  );
};

export default DataTable;