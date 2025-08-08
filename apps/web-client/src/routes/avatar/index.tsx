import {
    Avatar,
    Badge,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    ScrollArea,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Skeleton,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@anime-eternal-wiki/ui";
import { cn } from "@anime-eternal-wiki/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Globe, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useAvatarData } from "../../hooks/useAvatarData";
import { RARITY_COLORS, RARITY_ORDER } from "../../types/avatar";

export const Route = createFileRoute("/avatar/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { worlds, filterAvatars } = useAvatarData();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedWorld, setSelectedWorld] = useState("all");
    const [selectedRarity, setSelectedRarity] = useState("all");

    const rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythical", "Phantom"];

    // Format numbers helper
    const formatNumber = (num: number) => {
        if (num >= 1000000000000) return `${(num / 1000000000000).toFixed(2)}T`;
        if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
        if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
        return num.toString();
    };

    // Filter avatars based on current filters
    const filteredAvatars = useMemo(() => {
        const worldId = selectedWorld === "all" ? undefined : Number.parseInt(selectedWorld);
        const rarity = selectedRarity === "all" ? undefined : selectedRarity;
        return filterAvatars(worldId, rarity, searchTerm);
    }, [filterAvatars, selectedWorld, selectedRarity, searchTerm]);

    // Group avatars by world for world view
    const avatarsByWorld = useMemo(() => {
        const grouped: Record<string, typeof filteredAvatars> = {};

        for (const avatar of filteredAvatars) {
            const worldName = avatar.worldName;
            if (!grouped[worldName]) {
                grouped[worldName] = [];
            }
            grouped[worldName].push(avatar);
        }

        // Sort avatars within each world by rarity order
        for (const worldName of Object.keys(grouped)) {
            grouped[worldName].sort((a, b) => {
                const rarityA = RARITY_ORDER[a.rarity.toUpperCase() as keyof typeof RARITY_ORDER];
                const rarityB = RARITY_ORDER[b.rarity.toUpperCase() as keyof typeof RARITY_ORDER];
                return rarityA - rarityB;
            });
        }

        return grouped;
    }, [filteredAvatars]);

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm("");
        setSelectedWorld("all");
        setSelectedRarity("all");
    };

    const hasActiveFilters = searchTerm || selectedWorld !== "all" || selectedRarity !== "all";

    // Loading state
    if (worlds.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <Skeleton className="h-8 w-64" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }, (_, i) => ({ id: `skeleton-${Date.now()}-${i}` })).map((item) => (
                            <Skeleton key={item.id} className="h-32 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Avatar Collection
                </h1>
                <p className="text-muted-foreground">Discover all avatars across different worlds and rarities</p>
            </div>

            {/* Filter Bar */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="🔍 Search avatars or worlds..."
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-background border-2"
                        />
                    </div>

                    {/* World Filter */}
                    <Select value={selectedWorld} onValueChange={setSelectedWorld}>
                        <SelectTrigger className="w-full sm:w-48 bg-background border-2">
                            <SelectValue placeholder="🌍 All Worlds" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" className="font-medium">
                                🌍 All Worlds
                            </SelectItem>
                            {worlds.map((world) => (
                                <SelectItem key={world.id} value={world.id.toString()} className="font-medium">
                                    {world.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Rarity Filter */}
                    <Select value={selectedRarity} onValueChange={setSelectedRarity}>
                        <SelectTrigger className="w-full sm:w-48 bg-background border-2">
                            <SelectValue placeholder="✨ All Rarities" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" className="font-medium">
                                ✨ All Rarities
                            </SelectItem>
                            {rarities.map((rarity) => (
                                <SelectItem key={rarity} value={rarity} className="font-medium">
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className={cn(
                                                "h-3 w-3 rounded-full bg-gradient-to-r",
                                                RARITY_COLORS[rarity.toUpperCase() as keyof typeof RARITY_COLORS],
                                            )}
                                        />
                                        <span>{rarity}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <Button variant="outline" size="icon" onClick={clearFilters} className="shrink-0">
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2">
                        {searchTerm && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                                Search: {searchTerm}
                                <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                            </Badge>
                        )}
                        {selectedWorld !== "all" && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                                World: {worlds.find((w) => w.id.toString() === selectedWorld)?.name}
                                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedWorld("all")} />
                            </Badge>
                        )}
                        {selectedRarity !== "all" && (
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "flex items-center gap-1 text-white border-0 bg-gradient-to-r",
                                    RARITY_COLORS[selectedRarity.toUpperCase() as keyof typeof RARITY_COLORS],
                                )}>
                                {selectedRarity}
                                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedRarity("all")} />
                            </Badge>
                        )}
                    </div>
                )}
            </div>

            {/* Main Content - Avatars by World */}
            <ScrollArea className="h-[600px]">
                {Object.keys(avatarsByWorld).length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No worlds found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(avatarsByWorld).map(([worldName, worldAvatars]) => (
                            <div key={worldName} className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border">
                                    <Globe className="h-6 w-6 text-blue-600" />
                                    <h2 className="text-2xl font-bold text-foreground">{worldName}</h2>
                                    <span className="text-sm font-semibold text-muted-foreground bg-background px-2 py-1 rounded-md">
                                        {worldAvatars.length} avatar{worldAvatars.length !== 1 ? "s" : ""}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {worldAvatars.map((avatar, index) => {
                                        const rarityKey = avatar.rarity.toUpperCase() as keyof typeof RARITY_COLORS;
                                        const gradientClass = RARITY_COLORS[rarityKey];

                                        return (
                                            <TooltipProvider key={`${avatar.worldName}-${avatar.name}-${index}`}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-opacity-50 bg-card">
                                                            <CardHeader className="pb-2">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center space-x-3">
                                                                        <Avatar
                                                                            className={cn(
                                                                                "h-12 w-12 bg-gradient-to-br",
                                                                                gradientClass,
                                                                            )}>
                                                                            <div className="flex items-center justify-center h-full w-full text-white font-bold text-lg">
                                                                                {avatar.name.charAt(0)}
                                                                            </div>
                                                                        </Avatar>
                                                                        <div>
                                                                            <CardTitle className="text-sm font-semibold text-foreground">
                                                                                {avatar.name}
                                                                            </CardTitle>
                                                                            <p className="text-xs text-muted-foreground font-medium">
                                                                                {avatar.worldName}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <Badge
                                                                        variant="secondary"
                                                                        className={cn(
                                                                            "bg-gradient-to-r text-white border-0 font-semibold shadow-md",
                                                                            gradientClass,
                                                                        )}>
                                                                        {avatar.rarity}
                                                                    </Badge>
                                                                </div>
                                                            </CardHeader>
                                                            <CardContent className="pt-0">
                                                                <div className="flex items-center justify-between bg-muted/50 rounded-md px-3 py-2">
                                                                    <span className="text-xs font-medium text-muted-foreground">
                                                                        Base Energy
                                                                    </span>
                                                                    <span className="font-bold text-sm text-foreground">
                                                                        {formatNumber(avatar.baseEnergy)}
                                                                    </span>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-popover/95 backdrop-blur-sm border border-border">
                                                        <div className="space-y-1">
                                                            <p className="font-semibold text-foreground">
                                                                {avatar.name}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                World: {avatar.worldName}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Rarity: {avatar.rarity}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Base Energy: {avatar.baseEnergy.toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}
