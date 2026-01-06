import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { redirect } from "next/navigation";

export default async function BillingPage({ searchParams }: { searchParams: { courseId: string } }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");
    if (!searchParams.courseId) redirect("/dashboard");

    const { data: course } = await supabase
        .from("courses")
        .select("*")
        .eq("id", searchParams.courseId)
        .single();

    if (!course) return <div>Course not found</div>;

    return (
        <main className="min-h-screen bg-silver-100 flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center space-y-6">
                <h1 className="text-3xl font-bold text-primary-dark">Secure Checkout</h1>
                <p className="text-xl">Unlock full access to <br /><strong className="text-black">{course.title}</strong></p>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-lg font-bold text-blue-900">One-time payment</p>
                    <p className="text-3xl font-extrabold text-primary pt-2">$197.00</p>
                    <p className="text-sm text-gray-500 mt-1">Lifetime access • No subscription</p>
                </div>

                <form action="/api/stripe/checkout" method="POST">
                    <input type="hidden" name="courseId" value={course.id} />
                    <Button type="submit" size="xl" width="full" variant="action">
                        Pay Securely with Card
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">
                        Secured by Stripe. We do not store your card details.
                    </p>
                </form>
            </Card>
        </main>
    );
}
