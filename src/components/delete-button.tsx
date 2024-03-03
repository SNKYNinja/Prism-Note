import { useContext, useEffect, useState } from "react";
import { Icons } from "./icons";
import { Button, buttonVariants } from "./ui/button";
import {
    TooltipContent,
    TooltipTrigger,
    Tooltip,
} from "@/components/ui/tooltip";
import { NotesContext } from "@/App";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog";
import {
    AlertDialogAction,
    AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function DeleteButton() {
    const { deleteMode, setDeleteMode, noteHandler } =
        useContext(NotesContext)!;
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClick = () => {
        if (!deleteMode.isDeleting) {
            setDeleteMode({ isDeleting: true, selectedNotes: [] });
        } else if (deleteMode.selectedNotes.length < 1) {
            setDeleteMode({ isDeleting: false, selectedNotes: [] });
        } else {
            setDialogOpen(true);
        }
    };

    const handleCancel = () => {
        setDialogOpen(false);
        setDeleteMode({ isDeleting: false, selectedNotes: [] });
    };

    const handleDelete = () => {
        setDialogOpen(false);
        if (deleteMode.isDeleting) {
            noteHandler.removeNotes(...deleteMode.selectedNotes);
            noteHandler.update();
            setDeleteMode({ isDeleting: false, selectedNotes: [] });
            toast.success("Notes deleted");
        }
    };

    return (
        <>
            <Tooltip delayDuration={200}>
                <TooltipTrigger>
                    <Button
                        className={cn(
                            "group rounded-full p-2 shadow-2xl scale-125 border-solid border-2 hover:border-red-600 border-red-500 bg-red-500 hover:bg-red-600 transition-colors duration-500 ease-in-out mx-auto",
                            deleteMode.isDeleting &&
                                "bg-transparent  hover:bg-transparent"
                        )}
                        onClick={handleClick}
                    >
                        <Icons.delete
                            className={cn(
                                deleteMode.isDeleting && "stroke-red-500",
                                "size-6 p-[3px]"
                            )}
                        />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="mt-2">
                    <span className="text-sm">Delete</span>
                </TooltipContent>
            </Tooltip>

            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Do you want to delete{" "}
                            {deleteMode.selectedNotes.length} note
                            {deleteMode.selectedNotes.length > 1 ? "s" : ""}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the selected notes
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="">
                        <AlertDialogCancel
                            onClick={handleCancel}
                            className={cn(
                                buttonVariants(),
                                "bg-zinc-400/85 hover:bg-zinc-400/85 transition-all border-zinc-400 border-b-[6px] outline-none hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                            )}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className={cn(
                                buttonVariants({ variant: "destructive" }),
                                "transition-all border-red-600/90 border-b-[6px] outline-none hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                            )}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
