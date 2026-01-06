import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "action" | "outline" | "ghost";
    size?: "default" | "lg" | "xl";
    width?: "auto" | "full";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", width = "auto", ...props }, ref) => {

        // Senior-Friendly Specs: Big touch targets, clear colors
        const variants = {
            primary: "bg-primary text-white hover:bg-primary-dark shadow-sm border-2 border-transparent",
            action: "bg-action text-white hover:bg-action-hover shadow-md border-2 border-transparent font-bold",
            outline: "bg-transparent text-primary border-2 border-primary hover:bg-silver-100",
            ghost: "bg-transparent text-foreground hover:bg-silver-100 border-2 border-transparent"
        };

        const sizes = {
            default: "h-12 px-6 text-lg rounded-lg", // Base size = 48px height min
            lg: "h-14 px-8 text-xl rounded-lg",      // Large = 56px height
            xl: "h-16 px-10 text-2xl rounded-xl"     // Extra Large for main CTAs
        };

        const widths = {
            auto: "w-auto",
            full: "w-full"
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    widths[width],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
