import TicketPriority from "@/components/TicketPriority";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import { Table, TableRow, TableHeader, TableHead, TableBody, TableCell   } from "@/components/ui/table";
import { Ticket } from "@prisma/client";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SearchParams } from "./page";

interface Props {
  tickets: Ticket[];
  searchParams: SearchParams['searchParams'];
}

const DataTable = async ({ tickets, searchParams }: Props) => {
    const params = await searchParams;
    const orderBy = params.orderby || 'title';
    const sortDir = params.sortDir || 'asc';

  return (
    <div className="w-full mt-5">
        <div className="rounded-md sm:border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <div className="flex items-center gap-1">
                                <Link href={`/tickets?orderby=title&sortDir=${sortDir === 'asc' ? 'desc' : 'asc'}`}>
                                    Title
                                </Link>
                                {orderBy === 'title' && (sortDir === 'asc' ? 
                                    <ArrowUp className="w-4 h-4" /> : 
                                    <ArrowDown className="w-4 h-4" />
                                )}
                            </div>
                        </TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>
                            <div className="flex justify-center">
                                <Link href={`/tickets?orderby=status&sortDir=${sortDir === 'asc' ? 'desc' : 'asc'}`}>Status</Link>
                                {orderBy === 'status' && (sortDir === 'asc' ? 
                                    <ArrowUp className="w-4 h-4" /> : 
                                    <ArrowDown className="w-4 h-4" />
                                )}
                            </div>
                        </TableHead>
                        <TableHead>
                            <div className="flex justify-center">
                                <Link href={`/tickets?orderby=priority&sortDir=${sortDir === 'asc' ? 'desc' : 'asc'}`}>Priority</Link>
                                {orderBy === 'priority' && (sortDir === 'asc' ? 
                                    <ArrowUp className="w-4 h-4" /> : 
                                    <ArrowDown className="w-4 h-4" />
                                )}
                            </div>
                        </TableHead>
                            <TableHead>
                            <div className="flex justify-center">
                                <Link href={`/tickets?orderby=createdAt&sortDir=${sortDir === 'asc' ? 'desc' : 'asc'}`}>Created At</Link>
                                {orderBy === 'createdAt' && (sortDir === 'asc' ? 
                                    <ArrowUp className="w-4 h-4" /> : 
                                    <ArrowDown className="w-4 h-4" />
                                )}
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets ? tickets.map((ticket) => (
                        <TableRow key={ticket.id} data-href ={`/tickets/${ticket.id}`}>
                            <TableCell><Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link></TableCell>
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