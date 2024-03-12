import { Note } from "@/types/type";
import Star from "@/components/star";
import CardSkeleton from "@/components/card-skeleton";
import { Button } from "@/components/ui/button";
import { createContext, memo, useContext, useState } from "react";
import DeleteSelection from "@/components/delete-selection";
import { cva } from "class-variance-authority";
import { NotesContext } from "@/App";
import { DrawerContent, DrawerTrigger } from "./ui/drawer";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Editor from "./editor";
import { cn } from "@/lib/utils";

interface NoteContextData {
    note: Note;
    setNote: React.Dispatch<React.SetStateAction<Note>>;
}

export const NoteContext = createContext<NoteContextData | null>(null);

const Card = memo(
    ({ noteData, isLoading }: { noteData: Note; isLoading: boolean }) => {
        const [note, setNote] = useState<Note>(noteData);
        const { deleteMode } = useContext(NotesContext)!;

        const { title, tag, timeCreated } = note;

        const buttonVariants = cva(
            "col-span-1 shadow-md rounded-xl p-4 h-64 drop-shadow-md group",
            {
                variants: {
                    tags: {
                        blue: "bg-blue-300",
                        purple: "bg-purple-300",
                        red: "bg-red-300",
                        emerald: "bg-emerald-300",
                        orange: "bg-orange-300",
                    },
                },
            }
        );

        if (isLoading) return <CardSkeleton />;
        return (
            <NoteContext.Provider value={{ note, setNote }}>
                <DrawerTrigger
                    className={cn(
                        buttonVariants({ tags: tag }),
                        "hover:outline"
                    )}
                >
                    <div className="relative size-full">
                        <header className="text-2xl max-w-[70%] text-start">
                            {title}
                        </header>
                        <Button
                            variant="ghost"
                            className="rounded-full outline-none p-2 bg-transparent hover:bg-transparent absolute top-0 right-0"
                        >
                            <Star width="1.5rem" height="1.5rem" />
                        </Button>
                        <p className="opacity-70 select-none text-start">
                            {timeCreated}
                        </p>
                        {deleteMode.isDeleting && <DeleteSelection />}
                    </div>
                </DrawerTrigger>
                <DrawerContent className="fixed bottom-0 left-0 right-0 h-screen">
                    <ScrollArea className="overflow-auto p-4 w-full h-full">
                        <Editor note={note} />
                    </ScrollArea>
                </DrawerContent>
            </NoteContext.Provider>
        );
    }
);

export default Card;
