import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch courses with entitlements check
    const { data: courses } = await supabase
        .from("courses")
        .select("*, modules(count), entitlements(status)");

    return (
        <main className="min-h-screen bg-silver-100 p-6">
            <div className="max-w-[720px] mx-auto space-y-8">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-primary-dark">Your Dashboard</h1>
                        <p className="text-gray-600">Welcome back, {user.email}</p>
                    </div>
                    <form action="/auth/signout" method="post">
                        {/* Simple signout form, in real app use server action */}
                        <Button variant="ghost" size="default">Sign Out</Button>
                    </form>
                </header>

                <section className="space-y-4">
                    {courses?.map((course) => {
                        const isEntitled = course.entitlements?.some((e: any) => e.status === 'active');

                        return (
                            <Card key={course.id} className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
                                    <p className="text-gray-600 mt-2">{course.description}</p>
                                    {course.modules && (
                                        <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                                            {(course.modules as any)[0]?.count || 0} Modules
                                        </span>
                                    )}
                                </div>

                                <div className="w-full md:w-auto">
                                    {course.is_paid && !isEntitled ? (
                                        <Link href={`/billing?courseId=${course.id}`}>
                                            <Button variant="action" width="full">Unlock Course</Button>
                                        </Link>
                                    ) : (
                                        <Link href={`/course/${course.id}`}>
                                            <Button width="full">Continue Learning</Button>
                                        </Link>
                                    )}
                                </div>
                            </Card>
                        );
                    })}

                    {(!courses || courses.length === 0) && (
                        <div className="text-center py-12 text-gray-500">
                            No courses available yet.
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
