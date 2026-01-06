'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function markLessonComplete(lessonId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const { error } = await supabase
        .from("lesson_completions")
        .upsert({ user_id: user.id, lesson_id: lessonId, completed_at: new Date().toISOString() })
        .select();

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard");
    revalidatePath(`/lesson/${lessonId}`);
}
