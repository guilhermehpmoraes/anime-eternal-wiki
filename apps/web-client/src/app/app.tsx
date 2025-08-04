import { Button } from "@anime-eternal-wiki/ui";
import { cn } from "@anime-eternal-wiki/utils";

export function App() {
    return (
        <div className={cn(["flex flex-row", "items-center justify-center", "h-screen w-screen", "bg-gray-900"])}>
            <Button variant={"destructive"}>Hello World</Button>
        </div>
    );
}

export default App;
