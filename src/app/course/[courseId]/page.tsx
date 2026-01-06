import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, CheckCircle, Lock } from "lucide-react";

export default async function CoursePage({ params }: { params: { courseId: string } }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch course with modules and lessons
    const { data: course } = await supabase
        .from("courses")
        .select(`
      *,
      modules (
        id, title, sort_order,
        lessons (id, title, is_free_preview, sort_order)
      ),
      entitlements (status)
    `)
        .eq("id", params.courseId)
        .single();

    if (!course) return <div>Course not found</div>;

    const isEntitled = course.entitlements?.some((e: any) => e.status === 'active');

    // Fetch completions for this user
    let completedLessonIds = new Set();
    if (user) {
        const { data: completions } = await supabase
            .from("lesson_completions")
            .select("lesson_id")
            .eq("user_id", user.id);
        completedLessonIds = new Set(completions?.map(c => c.lesson_id));
    }

    return (
        <main className="min-h-screen bg-background p-6">
            <div className="max-w-[720px] mx-auto">
                <Link href="/dashboard" className="text-primary hover:underline font-bold mb-6 inline-flex items-center gap-2">
                    <ArrowLeft size={20} /> Back to Dashboard
                </Link>

                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold text-primary-dark mb-4">{course.title}</h1>
                    <p className="text-xl text-gray-700">{course.description}</p>
                </header>

                <div className="space-y-8">
                    {course.modules?.sort((a: any, b: any) => a.sort_order - b.sort_order).map((module: any) => (
                        <div key={module.id} className="space-y-4">
                            <h2 className="text-2xl font-bold border-b-2 border-silver-200 pb-2">{module.title}</h2>
                            <div className="grid gap-3">
                                {module.lessons?.sort((a: any, b: any) => a.sort_order - b.sort_order).map((lesson: any) => {
                                    const isLocked = !isEntitled && !lesson.is_free_preview;
                                    const isCompleted = completedLessonIds.has(lesson.id);

                                    return (
                                        <Link
                                            key={lesson.id}
                                            href={isLocked ? "#" : `/lesson/${lesson.id}`}
                                            className={isLocked ? "pointer-events-none" : ""}
                                        >
                                            <Card className={`
                               flex justify-between items-center transition-all hover:bg-silver-100
                               ${isLocked ? 'opacity-60 bg-silver-100' : 'cursor-pointer'}
                             `}>
                                                <div className="flex items-center gap-4">
                                                    {isCompleted ? (
                                                        <CheckCircle className="text-green-600" size={28} />
                                                    ) : (
                                                        <div className="w-7 h-7 rounded-full border-2 border-silver-200" />
                                                    )}
                                                    <span className="text-xl font-medium text-gray-900">{lesson.title}</span>
                                                </div>
                                                {isLocked && <Lock className="text-gray-400" size={24} />}
                                            </Card>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
