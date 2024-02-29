import { Note } from "@/types/type";
import Star from "@/components/star";
import CardSkeleton from "@/components/card-skeleton";
import { Button } from "@/components/ui/button";
import EditorDialog from "@/components/editor-dialog";
import { createContext, useState } from "react";

interface NoteContextData {
    note: Note;
    setNote: React.Dispatch<React.SetStateAction<Note>>;
}

export const NoteContext = createContext<NoteContextData | null>(null);

export default function Card({
    noteData,
    isLoading,
}: {
    noteData: Note;
    isLoading: boolean;
}) {
    const [note, setNote] = useState<Note>(noteData);
    const { title, tag, timeCreated } = note;

    if (isLoading) return <CardSkeleton />;
    return (
        <NoteContext.Provider value={{ note, setNote }}>
            <div
                className={`bg-${tag}-300 col-span-1 shadow-md rounded-xl p-4 h-64 drop-shadow-md group`}
            >
                <div className="relative size-full">
                    <header className="text-2xl max-w-[70%]">{title}</header>
                    <Button
                        variant="ghost"
                        className="rounded-full outline-none p-2 bg-transparent hover:bg-transparent absolute top-0 right-0"
                    >
                        <Star width="1.5rem" height="1.5rem" />
                    </Button>
                    <p className="opacity-70 select-none">{timeCreated}</p>
                    <EditorDialog />
                </div>
            </div>
        </NoteContext.Provider>
    );
}
