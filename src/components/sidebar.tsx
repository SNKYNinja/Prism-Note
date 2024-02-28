import { siteConfig } from "@/config/site";
import { Icons } from "./icons";
import { capitalize } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tags } from "@/types/type";

export default function Sidebar() {
    const tags: Tags[] = ["blue", "purple", "red", "green", "orange"];

    return (
        <div className="h-full w-[15%] flex flex-col items-center justify-between">
            <header className="font-semibold text-3xl text-center mt-5">
                {siteConfig.name}
            </header>
            <div className="flex flex-col gap-7 mb-52">
                <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                        <Button className="rounded-full p-2 shadow-2xl scale-125">
                            <Icons.plus color="#fff" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="mb-2">
                        <span className="text-sm">Create a new note</span>
                    </TooltipContent>
                </Tooltip>
                {tags.map((tag) => (
                    <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                            <button
                                className={`bg-${tag}-300 scale-125 rounded-full p-2 hover:scale-150 transition ease-in-out mx-auto`}
                            ></button>
                        </TooltipTrigger>
                        <TooltipContent className="mb-2" side="right">
                            <span className="text-sm">{capitalize(tag)}</span>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
}
