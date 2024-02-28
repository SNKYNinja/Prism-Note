import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export default function Editor() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    variant="link"
                    className="rounded-full p-2 absolute right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.4rem"
                        height="1.4rem"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
                    </svg>
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[90vw] h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
