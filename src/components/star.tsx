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

    const handleClick = () => {
        setIsFavorite(!isFavorite);
    };
    return (
        <label className="block relative cursor-pointer select-none">
            <input
                type="checkbox"
                checked={isFavorite}
                className="absolute opacity-0 cursor-pointer size-0 peer"
                onClick={handleClick}
            />
            {/* <svg
                height="50px"
                width="50px"
                className="relative top-0 left-0 transition-all duration-300 fill-[#666] hover:scale-[1.15] peer-checked:fill-[#ffeb49]"
                id="Layer_1"
                version="1.2"
                viewBox="0 0 24 24"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                {...props}
            >
                <g>
                    <g>
                        <path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path>
                    </g>
                </g>
            </svg> */}
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
