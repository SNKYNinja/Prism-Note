import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";
import { Note } from "@/types/type";
import React, { createContext, useState } from "react";

// const data: Note[] = [
//     {
//         id: 1,
//         title: "Grocery List",
//         content: "Buy milk and eggs",
//         favorite: false,
//         timeCreated: "20 Feb 2024",
//         tag: "red",
//     },
//     {
//         id: 2,
//         title: "Meeting Agenda",
//         content: "Discuss quarterly targets",
//         favorite: true,
//         timeCreated: "18 Feb 2024",
//         tag: "orange",
//     },
//     {
//         id: 3,
//         title: "Exercise Routine",
//         content: "Cardio for 30 mins",
//         favorite: false,
//         timeCreated: "15 Feb 2024",
//         tag: "purple",
//     },
//     {
//         id: 4,
//         title: "Recipe",
//         content: "Cook spaghetti for dinner",
//         favorite: true,
//         timeCreated: "10 Feb 2024",
//         tag: "emerald",
//     },
//     {
//         id: 5,
//         title: "Daily Journal",
//         content: "Reflect on today's achievements",
//         favorite: false,
//         timeCreated: "5 Feb 2024",
//         tag: "blue",
//     },
//     {
//         id: 6,
//         title: "Shopping List",
//         content: "Buy fruits and vegetables",
//         favorite: false,
//         timeCreated: "2 Feb 2024",
//         tag: "red",
//     },
//     {
//         id: 7,
//         title: "Study Plan",
//         content: "Review chapter 5 and 6",
//         favorite: true,
//         timeCreated: "28 Jan 2024",
//         tag: "orange",
//     },
//     {
//         id: 8,
//         title: "Workout Schedule",
//         content: "Strength training for 45 mins",
//         favorite: false,
//         timeCreated: "25 Jan 2024",
//         tag: "purple",
//     },
//     {
//         id: 9,
//         title: "Project Ideas",
//         content: "Brainstorm new project ideas",
//         favorite: true,
//         timeCreated: "20 Jan 2024",
//         tag: "emerald",
//     },
//     {
//         id: 10,
//         title: "Vacation Planning",
//         content: "Research vacation destinations",
//         favorite: false,
//         timeCreated: "15 Jan 2024",
//         tag: "blue",
//     },
//     {
//         id: 11,
//         title: "Book List",
//         content: "Read 'The Great Gatsby'",
//         favorite: false,
//         timeCreated: "10 Jan 2024",
//         tag: "red",
//     },
//     {
//         id: 12,
//         title: "Budget Planning",
//         content: "Review monthly expenses",
//         favorite: true,
//         timeCreated: "5 Jan 2024",
//         tag: "orange",
//     },
// ];

// localStorage.setItem("notes", JSON.stringify(data));
// localStorage.clear();

interface NotesContextData {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotesContext = createContext<NotesContextData | null>(null);

function App() {
    const cards = JSON.parse(localStorage.getItem("notes")!) as Note[];
    const [notes, setNotes] = useState<Note[]>(cards);
    const [isLoading, setIsLoading] = useState(false);
    return (
        <NotesContext.Provider
            value={{ notes, setNotes, isLoading, setIsLoading }}
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
