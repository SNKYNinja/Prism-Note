"use client";

import * as React from "react";
import EditorJS from "@editorjs/editorjs";
import TextareaAutosize from "react-textarea-autosize";

import "@/editor.css";
import { cn, getCurrentTime } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { NotesContext } from "@/App";
import { useForm } from "react-hook-form";
import { DrawerClose } from "./ui/drawer";
import { Note } from "@/types/type";

type FormData = {
    title: string;
};

export default function Editor({ note }: { note: Note }) {
    const { register, handleSubmit } = useForm<FormData>();
    const ref = React.useRef<EditorJS>();
    const [isSaving, setIsSaving] = React.useState<boolean>(false);
    const [isMounted, setIsMounted] = React.useState<boolean>(false);
    const [isEditing, setIsEditing] = React.useState<boolean>(true);

    const { noteHandler } = React.useContext(NotesContext)!;

    const initializeEditor = React.useCallback(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const Embed = (await import("@editorjs/embed")).default;
        const Table = (await import("@editorjs/table")).default;
        const List = (await import("@editorjs/list")).default;
        const Code = (await import("@editorjs/code")).default;
        const LinkTool = (await import("@editorjs/link")).default;
        const InlineCode = (await import("@editorjs/inline-code")).default;

        if (!ref.current) {
            const editor = new EditorJS({
                holder: "editor",
                onReady() {
                    ref.current = editor;
                },
                placeholder: "Type here to write your post...",
                data: note.content,
                readOnly: isEditing,
                inlineToolbar: true,
                tools: {
                    header: Header,
                    linkTool: LinkTool,
                    list: List,
                    code: Code,
                    inlineCode: InlineCode,
                    table: Table,
                    embed: Embed,
                },
            });
        }
    }, [note, isEditing]);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMounted(true);
        }
    }, []);

    React.useEffect(() => {
        if (isMounted) {
            initializeEditor();

            return () => {
                ref.current?.destroy();
                ref.current = undefined;
            };
        }
    }, [isMounted, initializeEditor]);

    function handleDelete() {
        setTimeout(() => {
            noteHandler.removeNotes(note.id);
            noteHandler.update();
            toast.success("Note has been deleted!");
        }, 100);
    }

    async function onSubmit(data: FormData) {
        setIsSaving(true);

        const blocks = await ref.current?.save();

        noteHandler.editNote({
            id: note.id,
            title: data.title,
            content: blocks,
            favorite: note.favorite,
            tag: "emerald",
            timeCreated: getCurrentTime(),
        });
        noteHandler.update();

        setIsSaving(false);

        // toast.error("Something went wrong. Please try again.");

        return toast.success("Your post has been edited.");
    }

    if (!isMounted) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container">
            <div className="grid w-full gap-10 bg-white">
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center space-x-5">
                        <DrawerClose
                            className={cn(
                                buttonVariants({ variant: "outline" })
                            )}
                            type="button"
                        >
                            <>
                                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                                Back
                            </>
                        </DrawerClose>
                        <DrawerClose
                            className={cn(
                                buttonVariants({ variant: "destructive" })
                            )}
                            onClick={handleDelete}
                        >
                            <Icons.delete className="mr-2 size-4" />
                            Delete
                        </DrawerClose>
                    </div>
                    <div className="space-x-5">
                        <Button
                            disabled={!isEditing}
                            className={cn(
                                buttonVariants(),
                                "disabled:opacity-75 disabled:cursor-not-allowed"
                            )}
                            onClick={setIsEditing.bind(null, !isEditing)}
                        >
                            Edit
                        </Button>
                        <DrawerClose
                            type="submit"
                            disabled={isEditing}
                            className={cn(
                                buttonVariants(),
                                "disabled:opacity-75 disabled:cursor-not-allowed"
                            )}
                        >
                            {isSaving && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            <span>Save</span>
                        </DrawerClose>
                    </div>
                </div>
                <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
                    <TextareaAutosize
                        autoFocus
                        id="title"
                        placeholder="Post title"
                        defaultValue={note.title}
                        readOnly={isEditing}
                        className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none read-only:select-none"
                        {...register("title", { required: true })}
                    />
                    <div id="editor" className="min-h-[500px]" />
                    <p className="text-sm text-gray-500">
                        Use{" "}
                        <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                            Tab
                        </kbd>{" "}
                        to open the command menu.
                    </p>
                </div>
            </div>
        </form>
    );
}
