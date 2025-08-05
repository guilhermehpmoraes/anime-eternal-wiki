import { Button } from "@anime-eternal-wiki/ui";
import { cn } from "@anime-eternal-wiki/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <div className={cn(["flex flex-row", "items-center justify-center", "h-screen w-screen", "bg-gray-900"])}>
            <Button variant={"destructive"}>Hello World</Button>
        </div>
    );
}
