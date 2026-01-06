import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-background px-6 py-12 text-center">
            <div className="max-w-[720px] space-y-8 animate-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-5xl font-extrabold tracking-tight text-primary-dark sm:text-6xl">
                    Build Your Business in Retirement
                </h1>

                <p className="text-xl text-gray-700 leading-relaxed">
                    A step-by-step blueprint designed specifically for retirees.
                    Turn your experience into income with clear, simple lessons.
                    No technical jargon. Just results.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link href="/login">
                        <Button size="xl" width="full" className="sm:w-auto">
                            Start Learning Now
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="outline" size="xl" width="full" className="sm:w-auto">
                            Learn More
                        </Button>
                    </Link>
                </div>

                <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="p-4 bg-white rounded-lg border border-silver-200">
                        <h3 className="font-bold text-lg text-primary mb-2">Simple & Clear</h3>
                        <p className="text-gray-600">Large text, easy navigation, and step-by-step guides.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-silver-200">
                        <h3 className="font-bold text-lg text-primary mb-2">at Your Pace</h3>
                        <p className="text-gray-600">No deadlines. Watch lessons whenever you want.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-silver-200">
                        <h3 className="font-bold text-lg text-primary mb-2">Real Support</h3>
                        <p className="text-gray-600">Designed for non-techies. We help you succeed.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
