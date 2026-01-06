import { createClient } from "@/lib/supabase/server";
import { markLessonComplete } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default async function LessonPage({ params }: { params: { lessonId: string } }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch lesson data
    const { data: lesson } = await supabase
        .from("lessons")
        .select("*, modules(course_id)")
        .eq("id", params.lessonId)
        .single();

    if (!lesson) redirect("/dashboard");

    // Check entitlement
    const { data: entitlement } = await supabase
        .from("entitlements")
        .select("status")
        .eq("user_id", user?.id)
        .eq("course_id", lesson.modules.course_id)
        .eq("status", "active")
        .single();

    if (!entitlement && !lesson.is_free_preview) {
        redirect(`/course/${lesson.modules.course_id}?error=locked`);
    }

    // Server Action wrapper
    async function completeLesson() {
        'use server';
        await markLessonComplete(params.lessonId);
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Top Bar */}
            <div className="bg-primary-dark text-white p-4">
                <div className="max-w-[720px] mx-auto flex justify-between items-center">
                    <Link href={`/course/${lesson.modules.course_id}`} className="hover:underline font-bold text-lg">
                        ← Back to Course
                    </Link>
                    <span className="text-sm uppercase tracking-widest hidden sm:block">Lesson Viewer</span>
                </div>
            </div>

            <div className="max-w-[720px] mx-auto p-6 md:p-12 space-y-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">{lesson.title}</h1>

                {/* Content Area - Senior Friendly: Large text, clear spacing */}
                <article className="prose prose-xl prose-gray max-w-none text-foreground leading-loose">
                    {lesson.content_html ? (
                        <div dangerouslySetInnerHTML={{ __html: lesson.content_html }} />
                    ) : (
                        <p>Content is loading or empty...</p>
                    )}
                </article>

                {/* Actions */}
                <div className="border-t-2 border-silver-200 pt-8 mt-12 flex flex-col items-center gap-6">
                    <form action={completeLesson}>
                        <Button size="xl" variant="action" width="auto" className="min-w-[250px]">
                            <CheckCircle className="mr-3" /> Mark as Complete
                        </Button>
                    </form>

                    <div className="flex justify-between w-full">
                        <Button variant="outline">Previous Lesson</Button>
                        <Button variant="outline">Next Lesson</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
