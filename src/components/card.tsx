import { Note } from "@/types/type";
import Star from "@/components/star";
import CardSkeleton from "@/components/card-skeleton";
import { Button } from "@/components/ui/button";
import Editor from "@/components/editor";

export default function Card({
    note,
    isLoading,
}: {
    note: Note;
    isLoading: boolean;
}) {
    const { id, title, tag, timeCreated } = note;

    if (isLoading) return <CardSkeleton />;
    return (
        <div
            className={`bg-${tag}-300 col-span-1 shadow-md rounded-xl p-4 h-64 drop-shadow-md group`}
        >
            <div className="relative size-full">
                <header className="text-2xl max-w-[70%]">{title}</header>
                <Button
                    variant="ghost"
                    className="rounded-full p-2 bg-transparent hover:bg-transparent absolute top-0 right-0"
                >
                    <Star width="1.5rem" height="1.5rem" noteId={id} />
                </Button>
                <p className="opacity-70 select-none">{timeCreated}</p>
                <Editor />
            </div>
        </div>
    );
}
