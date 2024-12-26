"use client"

import { ChevronFirst, ChevronLeft, ChevronRight, ChevronLast } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount / pageSize)
    if (pageCount <= 1) return null;

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    }


    return (
        <div>
            <div className="flex items-center gap-2">
                <Button variant="outline" disabled={currentPage === 1} onClick={() => changePage(1)}><ChevronFirst /></Button>
                <Button variant="outline" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}><ChevronLeft /></Button>
                <Button variant="outline" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}><ChevronRight /></Button>
                <Button variant="outline" disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}><ChevronLast /></Button>
            </div>
            <div className="text-sm text-muted-foreground">
                <p>
                    Page {currentPage} of {pageCount}
                </p>
            </div>
        </div>
    )
}

export default Pagination