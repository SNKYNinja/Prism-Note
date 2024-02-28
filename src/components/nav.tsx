import { memo } from "react";
import SearchBar from "@/components/search-bar";
import SocialLinks from "@/components/social-links";

const Nav = memo(() => {
    return (
        <div className="flex justify-between items-start">
            <SearchBar />
            <SocialLinks />
        </div>
    );
});

export default Nav;
