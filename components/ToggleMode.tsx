"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

const ToggleMode = () => {
    const { theme, setTheme } = useTheme();

    // 處理Next.js嘅hydration問題
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    
    const dark = theme === "dark";

    return (
        <Button variant="outline" size="icon" onClick={() => setTheme(dark ? "light" : "dark")}>
            {dark ? (<Sun className="hover:cursor-pointer hover:text-primary" />) : (<Moon className="hover:cursor-pointer hover:text-primary" />)}
        </Button>
    )

}

export default ToggleMode;
