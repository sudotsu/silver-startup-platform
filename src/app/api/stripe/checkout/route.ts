import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const courseId = formData.get("courseId") as string;

    if (!courseId) {
        return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    // Lookup Stripe Price ID from DB (assuming setup) or hardcode for demo
    // In real app: fetch course.price_id
    const priceId = process.env.STRIPE_COURSE_PRICE_ID || "price_H5ggYJDqf8";

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${request.headers.get("origin")}/dashboard?success=true`,
            cancel_url: `${request.headers.get("origin")}/billing?courseId=${courseId}&canceled=true`,
            customer_email: user.email,
            metadata: {
                userId: user.id,
                courseId: courseId,
            },
        });

        if (session.url) {
            return NextResponse.redirect(session.url, 303);
        }
        return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
