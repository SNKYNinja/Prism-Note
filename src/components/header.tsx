import { Separator } from "@/components/ui/separator";
import Card from "@/components/card";
import { useContext } from "react";
import Nav from "./nav";
import { NoteContext } from "@/App";

export default function Header() {
    const { notes, isLoading } = useContext(NoteContext)!;
    return (
        <div className="my-8 w-full">
            <Nav />
            <Separator />
            <div className="mt-5 ml-12">
                <h1 className="text-5xl font-medium mb-10">Notes</h1>
                {notes ? (
                    <div className="grid grid-cols-4 gap-5 mr-12">
                        {notes.map((note) => (
                            <Card
                                key={note.id}
                                note={note}
                                isLoading={isLoading}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-between items-center w-[100%] h-[20vh] overflow-hidden">
                        <img src="/no_note.png" alt="" className="" />
                    </div>
                )}
            </div>
        </div>
    );
}
