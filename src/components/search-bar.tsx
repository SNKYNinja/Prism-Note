import { Note } from "@/types/type";
import { Icons } from "@/components/icons";
import { useContext } from "react";
import { ContextData, NoteContext } from "./header";

export default function SearchBar() {
    const { setNotes, setIsLoading } = useContext(NoteContext) as ContextData;
    const notes = JSON.parse(localStorage.getItem("notes")!) as Note[];
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const search = e.target.value.toLowerCase().trim();
        if (search) {
            setNotes((prev) =>
                prev.filter((note) => note.title.toLowerCase().includes(search))
            );
        } else {
            setNotes(() => notes);
        }
        setTimeout(() => setIsLoading(false), 800);
    };

    return (
        <div className="w-1/2 mb-5 ml-8 overflow-hidden">
            <Icons.search className="absolute m-2" size="2rem" />
            <input
                type="text"
                className="bg-transparent pl-12 pr-4 m-2 outline-none w-full size-8 text-xl peer"
                placeholder="Search"
                onChange={handleSearch}
            />
            <div className="relative mt-1 top-0 left-0 bg-black transition duration-300 pointer-events-none scale-x-0 w-full h-[0.15rem] peer-active:scale-x-100 peer-focus:scale-x-100"></div>
        </div>
    );
}
