import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NotesContext } from "@/App";
import { useContext } from "react";
import { NoteContext } from "./card";
import { CheckedState } from "@radix-ui/react-checkbox";

export default function DeleteSelection() {
    const { setDeleteMode } = useContext(NotesContext)!;
    const { note } = useContext(NoteContext)!;
    const handleCheckedChange = (checked: CheckedState) => {
        setDeleteMode((prev) => {
            // If this checkbox is checked, add the note id to the deleteMode selectedNotes array
            if (checked) {
                return {
                    isDeleting: prev.isDeleting,
                    selectedNotes: [...prev.selectedNotes, note.id],
                };
            }
            // Else remove it from the deleteMode selectedNotes array
            else {
                return {
                    isDeleting: prev.isDeleting,
                    selectedNotes: prev.selectedNotes.filter(
                        (id) => id !== note.id
                    ),
                };
            }
        });
    };
    return (
        <Button
            variant="ghost"
            className="bg-transparent hover:bg-transparent absolute bottom-0 left-0 scale-150"
        >
            <Checkbox onCheckedChange={handleCheckedChange} />
        </Button>
    );
}
