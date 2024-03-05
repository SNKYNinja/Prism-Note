import { OutputData } from "@editorjs/editorjs";

export interface Note {
    id: number;
    title: string;
    content: OutputData | undefined;
    tag: Tags;
    timeCreated: string;
    favorite: boolean;
}

type Tags = "orange" | "red" | "blue" | "purple" | "emerald";
