import { Note } from "@/types/type";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    return `${hours}:${minutes}, ${day} ${month} ${year}`;
}

export function generateID() {
    const rand = Math.floor(Math.random() * 1000000000);
    console.log(rand);
    return rand;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setLocalStorage(value: Note[]) {
    localStorage.setItem("notes", JSON.stringify(value));
}

export function getLocalStorage() {
    return JSON.parse(localStorage.getItem("notes")!) as Note[];
}

export class NoteHandler {
    constructor(
        public notes: Note[],
        private setNotes: React.Dispatch<React.SetStateAction<Note[]>>
    ) {
        this.notes = notes;
        this.setNotes = setNotes;
    }

    addNote(note: Note) {
        this.notes = this.notes.concat([...this.notes], {
            ...note,
        });
    }

    removeNotes(...notesId: number[]) {
        this.notes = this.notes.filter((note) => !notesId.includes(note.id));
        console.log(this.notes);
    }

    editNote(note: Note) {
        const index = this.notes.findIndex((n) => n.id === note.id);
        this.notes[index] = note;
    }

    update() {
        this.setNotes(this.notes);
        setLocalStorage(this.notes);
    }
}
