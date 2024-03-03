import { Skeleton } from "@/components/ui/skeleton";

export default function CardsSkeleton() {
    return (
        <>
            {Array.from({ length: 9 }).map((_, index) => (
                <CardSkeleton key={index} />
            ))}
        </>
    );
}

function CardSkeleton() {
    return (
        <div className="col-span-1 relative shadow-md rounded-xl p-4 h-64 space-y-5 bg-neutral-100">
            <Skeleton className="text-2xl w-[70%] h-8 bg-slate-300" />
            <Skeleton className="rounded-full p-2 absolute -top-2 right-2 size-11 bg-slate-300" />
            <Skeleton className="w-[30%] h-8 bg-slate-300" />
            <Skeleton className="" />
        </div>
    );
}
