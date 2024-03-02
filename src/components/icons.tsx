import {
    GitHubLogoIcon,
    LinkedInLogoIcon,
    Pencil1Icon,
} from "@radix-ui/react-icons";
import { Plus, Search, Star, Loader2, ChevronLeft, Trash2 } from "lucide-react";
import { SVGProps } from "react";

export const Icons = {
    plus: Plus,
    search: Search,
    linkedin: LinkedInLogoIcon,
    github: GitHubLogoIcon,
    star: Star,
    pencil: Pencil1Icon,
    spinner: Loader2,
    chevronLeft: ChevronLeft,
    delete: ({ ...props }: SVGProps<SVGSVGElement>) => (
        <svg
            {...props}
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
            ></path>
        </svg>
    ),
};
