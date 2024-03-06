import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import Creator from "./creator";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

export default function CreateButton() {
    return (
        <Drawer>
            <DrawerTrigger
                className={cn(
                    buttonVariants(),
                    "rounded-full p-2 shadow-2xl scale-125"
                )}
            >
                <Icons.plus color="#fff" />
            </DrawerTrigger>
            <DrawerContent className="fixed bottom-0 left-0 right-0 h-screen">
                <ScrollArea className="overflow-auto p-4 w-full h-full">
                    <Creator />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}
