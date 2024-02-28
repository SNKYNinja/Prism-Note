import { getLocalStorage, setLocalStorage } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface StarProps extends React.SVGProps<SVGSVGElement> {
    noteId: number;
}

export default function Star({ noteId, ...props }: StarProps) {
    const notes = getLocalStorage();
    const note = notes.find((n) => n.id === noteId)!;
    const [isFavorite, setIsFavorite] = useState(note.favorite || false);

    useEffect(() => {
        const updatedNotes = notes.map((n) =>
            n.id === noteId ? { ...n, favorite: isFavorite } : n
        );
        setLocalStorage(updatedNotes);
    }, [isFavorite, noteId, notes]);

    const handleChange = () => {
        setIsFavorite(!isFavorite);
    };
    return (
        <label className="block relative cursor-pointer select-none">
            <input
                type="checkbox"
                checked={isFavorite}
                className="absolute opacity-0 cursor-pointer size-0 peer"
                onChange={handleClick}
            />
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="relative top-0 left-0 transition-all duration-300 fill-[#666] hover:scale-[1.15] peer-checked:fill-[#fae42f]"
                viewBox="0 0 24 24"
                fill="#666"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        </label>
    );
}
