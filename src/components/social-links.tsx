import { siteConfig } from "@/config/site";

import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function SocialLinks() {
    return (
        <div className="flex my-3 mr-6 gap-2">
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className="mx-auto p-3">
                        <a href={siteConfig.links.github} target="_blank">
                            <Icons.github height="2rem" width="2rem" />
                        </a>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    <span className="text-sm">Github</span>
                </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className="mx-auto p-3">
                        <a href={siteConfig.links.linkedin} target="_blank">
                            <Icons.linkedin height="2rem" width="2rem" />
                        </a>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    <span className="text-sm">LinkedIn</span>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
