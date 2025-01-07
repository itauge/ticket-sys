import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { User } from "@prisma/client";

interface Props {
    users: User[]
}


const DataTableSimple = ({users}: Props) => {
    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-secondary hover:bg-secondary">
                            <TableHead className="w-[100px]">Username</TableHead>
                            <TableHead className="w-[100px]">Role</TableHead>
                            <TableHead className="w-[100px]">Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users? users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell><Link href={`/users/${user.id}`}>{user.username}</Link></TableCell>
                                <TableCell><Link href={`/users/${user.id}`}>{user.role}</Link></TableCell>
                                <TableCell><Link href={`/users/${user.id}`}>{user.email}</Link></TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default DataTableSimple;