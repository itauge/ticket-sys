"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNavLink = () => {

    const links = [
        {label: "Home", href: "/"},
        {label: "Tickets", href: "/tickets"},
        {label: "Users", href: "/users"},
    ]

    const currentPath = usePathname();

    return (
        <div className="flex items-center gap-2">

            {links.map ((link) => (
                <Link href={link.href} key={link.label} className={`navbar-link ${currentPath === link.href ? "cursor-default text-primary/70 hover:text-primary/60" : ""}`} >
                    {link.label}
                </Link>
            ))}
        </div>
    )
}

export default MainNavLink;