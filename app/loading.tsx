import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full max-w-5xl space-y-8">
                {/* Hero section loading state */}
                <div className="space-y-4">
                    <Skeleton className="h-12 w-[300px]" />
                    <Skeleton className="h-6 w-[500px]" />
                    <div className="flex gap-4">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>

                {/* Logo carousel loading state */}
                <div className="flex gap-4 py-8">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-32" />
                    ))}
                </div>

                {/* Content sections loading state */}
                <div className="space-y-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-8 w-[200px]" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
} 