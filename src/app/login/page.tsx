'use client';

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });

        if (error) {
            setMessage("Error: " + error.message);
        } else {
            setMessage("Success! Check your email for the login link.");
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-silver-100 px-4">
            <Card className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary-dark">Welcome Back</h1>
                    <p className="text-gray-600 mt-2">Enter your email to sign in.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-lg font-medium text-gray-900">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full h-14 px-4 rounded-lg border-2 border-silver-200 text-xl focus:border-primary focus:outline-none"
                        />
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        width="full"
                        disabled={loading}
                    >
                        {loading ? "Sending Link..." : "Send Login Link"}
                    </Button>
                </form>

                {message && (
                    <div className={`p-4 rounded-lg font-medium ${message.startsWith("Success") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                        {message}
                    </div>
                )}
            </Card>
        </main>
    );
}
