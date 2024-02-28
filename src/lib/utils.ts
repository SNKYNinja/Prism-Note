import { Note } from "@/types/type";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setLocalStorage(value: Note[]) {
    localStorage.setItem("notes", JSON.stringify(value));
}

export function getLocalStorage() {
    return JSON.parse(localStorage.getItem("notes")!) as Note[];
}
