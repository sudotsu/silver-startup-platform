import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js"; // Direct admin client for webhooks

export async function POST(request: Request) {
    const body = await request.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        // Fulfill the purchase
        const userId = session.metadata?.userId;
        const courseId = session.metadata?.courseId;

        if (userId && courseId) {
            // Use Admin Client (Service Role) to bypass RLS for entitlement insertion
            const supabaseAdmin = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY! // Needed for webhook
            );

            const { error } = await supabaseAdmin
                .from("entitlements")
                .insert({
                    user_id: userId,
                    course_id: courseId,
                    source: 'stripe',
                    status: 'active'
                });

            if (error) {
                console.error("Failed to crate entitlement", error);
                return NextResponse.json({ error: "DB Error" }, { status: 500 });
            }
        }
    }

    return NextResponse.json({ received: true });
}
