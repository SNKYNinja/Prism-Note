import { siteConfig } from "@/config/site";

import { Tooltip } from "@/components/ui/tooltip";
import { Tags } from "@/types/type";
import CreateButton from "@/components/create-button";
import TagsButton from "@/components/tags-button";
import DeleteButton from "@/components/delete-button";
import { memo } from "react";
const tags: Tags[] = ["blue", "purple", "red", "emerald", "orange"];

const Sidebar = memo(() => {
    return (
        <Tooltip delayDuration={200}>
            <div className="h-full w-[15%] flex flex-col items-center justify-between">
                <header className="font-semibold text-3xl text-center mt-5">
                    {siteConfig.name}
                </header>
                <div className="flex flex-col gap-7 mb-52">
                    <CreateButton />
                    <TagsButton tags={tags} />
                    <DeleteButton />
                </div>
            </div>
        </Tooltip>
    );
});

export default Sidebar;
