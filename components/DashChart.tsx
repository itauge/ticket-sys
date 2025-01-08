"use client";

import { Status } from "@prisma/client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface dataElement {
    name: Status;
    value: number;
}

interface Props {
    data: dataElement[];
}

const DashChart = ({ data }: Props) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ticket Counts</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
                        <Bar dataKey="value" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default DashChart;