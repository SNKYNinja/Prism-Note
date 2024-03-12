import { Separator } from "@/components/ui/separator";
import Card from "@/components/card";
import { useContext } from "react";
import Nav from "@/components/nav";
import { NotesContext } from "@/App";
import CardsSkeleton from "@/components/card-skeleton";
import { Drawer } from "@/components/ui/drawer";

export default function Header() {
    // TODO: Move this isLoading to Card component as it isnt needed here
    const { notes, isLoading } = useContext(NotesContext)!;
    return (
        <div className="my-8 w-full">
            <Nav />
            <Separator />
            <div className="mt-5 ml-12">
                <h1 className="text-5xl font-medium mb-10">Notes</h1>
                {notes ? (
                    <Drawer>
                        <div className="grid grid-cols-4 gap-5 mr-12">
                            {isLoading ? (
                                <CardsSkeleton />
                            ) : (
                                notes.map((note) => (
                                    <Card
                                        key={note.id}
                                        noteData={note}
                                        isLoading={isLoading}
                                    />
                                ))
                            )}
                        </div>
                    </Drawer>
                ) : (
                    <div className="flex justify-between items-center w-[100%] h-[20vh] overflow-hidden">
                        <img src="/no_note.png" alt="" className="" />
                    </div>
                )}
                {notes.length === 0 && (
                    <div>
                        <img src="/vite.svg" alt="" />
                    </div>
                )}
            </div>
        </div>
    );
}
