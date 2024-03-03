import { capitalize } from "@/lib/utils";
import { Tags } from "@/types/type";
import {
    TooltipTrigger,
    TooltipContent,
    Tooltip,
} from "@/components/ui/tooltip";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
    "scale-125 rounded-full p-2 hover:scale-150 transition ease-in-out mx-auto",
    {
        variants: {
            tags: {
                blue: "bg-blue-300 hover:bg-blue-400",
                purple: "bg-purple-300 hover:bg-purple-400",
                red: "bg-red-300 hover:bg-red-400",
                emerald: "bg-emerald-300 hover:bg-emerald-400",
                orange: "bg-orange-300 hover:bg-orange-400",
            },
        },
    }
);

export default function TagsButton({ tags }: { tags: Tags[] }) {
    return tags.map((tag, index) => (
        <Tooltip key={index} delayDuration={200}>
            <TooltipTrigger asChild>
                <button className={buttonVariants({ tags: tag })}></button>
            </TooltipTrigger>
            <TooltipContent className="mb-2" side="right">
                <span className="text-sm">{capitalize(tag)}</span>
            </TooltipContent>
        </Tooltip>
    ));
}
