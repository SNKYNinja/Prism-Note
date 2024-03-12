import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";
import { Note } from "@/types/type";
import React, { createContext, useState } from "react";
import { NoteHandler } from "@/lib/utils";

interface NotesContextData {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    deleteMode: DeleteModeType;
    setDeleteMode: React.Dispatch<React.SetStateAction<DeleteModeType>>;
    noteHandler: NoteHandler;
}

export const NotesContext = createContext<NotesContextData | null>(null);
interface DeleteModeType {
    isDeleting: boolean;
    selectedNotes: number[];
}

function App() {
    const cards = JSON.parse(localStorage.getItem("notes") || "[]") as Note[];
    const [notes, setNotes] = useState<Note[]>(cards);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteMode, setDeleteMode] = useState<DeleteModeType>({
        isDeleting: false,
        selectedNotes: [],
    });

    const noteHandler = new NoteHandler(notes || [], setNotes);

    return (
        <NotesContext.Provider
            value={{
                notes,
                setNotes,
                isLoading,
                setIsLoading,
                deleteMode,
                setDeleteMode,
                noteHandler,
            }}
        >
            <TooltipProvider>
                <div className="flex w-screen h-screen max-w-full font-poppins">
                    <Sidebar />
                    <Separator orientation="vertical" />
                    <Header />
                    <Toaster />
                </div>
            </TooltipProvider>
        </NotesContext.Provider>
    );
}

export default App;
