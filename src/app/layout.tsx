import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Retiree Business Blueprint",
    description: "A simple, clear guide to starting your business in retirement.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
