import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";

function App() {
    return (
        <TooltipProvider>
            <div className="flex w-screen h-screen max-w-full font-poppins">
                <Sidebar />
                <Separator orientation="vertical" />
                <Header />
                <Toaster />
            </div>
        </TooltipProvider>
    );
}

export default App;
