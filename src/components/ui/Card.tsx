import React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "bg-white rounded-xl border border-silver-200 shadow-sm p-6 md:p-8",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
