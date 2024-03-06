"use client";

import * as React from "react";
import EditorJS from "@editorjs/editorjs";
import TextareaAutosize from "react-textarea-autosize";

import "@/editor.css";
import { cn, generateID, getCurrentTime } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { NotesContext } from "@/App";
import { useForm } from "react-hook-form";
import { DrawerClose } from "./ui/drawer";

type FormData = {
    title: string;
};

export default function Creator() {
    const { register, handleSubmit } = useForm<FormData>();
    const ref = React.useRef<EditorJS>();
    const [isSaving, setIsSaving] = React.useState<boolean>(false);
    const [isMounted, setIsMounted] = React.useState<boolean>(false);

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
    }, []);

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

    async function onSubmit(data: FormData) {
        setIsSaving(true);

        const blocks = await ref.current?.save();

        noteHandler.addNote({
            id: generateID(),
            title: data.title,
            content: blocks,
            favorite: false,
            tag: "emerald",
            timeCreated: getCurrentTime(),
        });
        noteHandler.update();

        setIsSaving(false);

        // toast.error("Something went wrong. Please try again.");

        return toast.success("Your post has been created.");
    }

    if (!isMounted) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container">
            <div className="grid w-full gap-10 bg-white">
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center space-x-10">
                        <DrawerClose
                            className={cn(buttonVariants({ variant: "ghost" }))}
                            type="button"
                        >
                            <>
                                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                                Back
                            </>
                        </DrawerClose>
                    </div>
                    <DrawerClose type="submit" className={cn(buttonVariants())}>
                        {isSaving && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span>Save</span>
                    </DrawerClose>
                </div>
                <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
                    <TextareaAutosize
                        autoFocus
                        id="title"
                        placeholder="Post title"
                        className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
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
