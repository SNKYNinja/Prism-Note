export interface Note {
    id: number;
    title: string;
    content: string;
    tag: Tags;
    timeCreated: string;
    favorite: boolean;
}

type Tags = "orange" | "red" | "blue" | "purple" | "emerald";
