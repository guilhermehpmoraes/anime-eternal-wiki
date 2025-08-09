import {
    Avatar,
    Badge,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Skeleton,
} from "@anime-eternal-wiki/ui";
import { getRarityOrder, getRarityStyle, Rarity } from "@anime-eternal-wiki/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Globe, Search, User, X } from "lucide-react";
import { useMemo, useState } from "react";
import wikiData from "../../data/wiki-data.json";
import { useAvatarData } from "../../hooks/useAvatarData";

export const Route = createFileRoute("/avatar/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { worlds, filterAvatars } = useAvatarData();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedWorld, setSelectedWorld] = useState("all");
    const [selectedRarity, setSelectedRarity] = useState<"all" | Rarity>("all");

    const rarities: Rarity[] = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythical", "Phantom"];

    // Get avatar upgrade data
    const avatarModule = wikiData.modules.find((module) => module.id === "avatar");
    const upgradeData = avatarModule?.data?.upgrades || [];

    // Calculate energy with upgrade level
    const calculateEnergyWithUpgrade = (baseEnergy: number, level: number): number => {
        const upgrade = upgradeData.find((u) => u.level === level);
        if (!upgrade) return baseEnergy;

        // Convert percentage string to number (e.g., "100%" -> 100)
        const bonusPercent = parseInt(upgrade.energyBonus.replace("%", ""));
        return Math.floor(baseEnergy * (1 + bonusPercent / 100));
    };

    // Helper to handle rarity change
    const handleRarityChange = (value: string) => {
        setSelectedRarity(value as "all" | Rarity);
    };

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
                const rarityA = getRarityOrder(a.rarity);
                const rarityB = getRarityOrder(b.rarity);
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
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="relative inline-block mb-6">
                    <User className="w-20 h-20 mx-auto text-blue-400" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-20 animate-pulse"></div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Avatar Collection</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Discover all avatars across different worlds and rarities
                </p>
                <Badge variant="secondary" className="text-sm bg-yellow-500/20 text-yellow-200 border-yellow-500/30">
                    {filteredAvatars.length} Total Avatars
                </Badge>
            </div>

            {/* Avatar Upgrade Information */}
            <div className="mb-12">
                <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-blue-200 flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <User className="h-6 w-6 text-blue-400" />
                            </div>
                            Avatar Upgrade System
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Upgrade Cost */}
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                                    <h3 className="font-semibold text-green-200">Total Upgrade Cost</h3>
                                </div>
                                <p className="text-2xl font-bold text-white mb-1">
                                    {formatNumber(avatarModule?.data?.totalUpgradeCost || 0)} Souls
                                </p>
                                <p className="text-sm text-gray-300">To reach level 150 (max)</p>
                            </div>

                            {/* Maximum Bonus */}
                            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
                                    <h3 className="font-semibold text-purple-200">Maximum Bonus</h3>
                                </div>
                                <p className="text-2xl font-bold text-white mb-1">
                                    +{upgradeData.find((u) => u.level === 150)?.energyBonus || "750%"}
                                </p>
                                <p className="text-sm text-gray-300">Energy boost at max level</p>
                            </div>

                            {/* Common Milestones */}
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                                    <h3 className="font-semibold text-yellow-200">Key Milestones</h3>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-200">
                                        Level 100: <span className="text-white font-semibold">+500%</span>
                                    </p>
                                    <p className="text-sm text-gray-200">
                                        Level 150: <span className="text-white font-semibold">+750%</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-200 mb-3">How Avatar Upgrades Work</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                                <div>
                                    <p className="mb-2">
                                        <strong className="text-white">Cost:</strong> Each level requires Avatar Souls
                                    </p>
                                    <p className="mb-2">
                                        <strong className="text-white">Benefit:</strong> Increases avatar's energy
                                        output percentage
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-2">
                                        <strong className="text-white">Progression:</strong> Linear increase of 5% per
                                        level (1-100)
                                    </p>
                                    <p className="mb-2">
                                        <strong className="text-white">Advanced:</strong> Slower progression after level
                                        100
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filter Bar */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search avatars or worlds..."
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* World Filter */}
                    <Select value={selectedWorld} onValueChange={setSelectedWorld}>
                        <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20">
                            <SelectValue placeholder="Select World" className="text-white" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" className="text-gray-800 font-medium">
                                All Worlds
                            </SelectItem>
                            {worlds.map((world) => (
                                <SelectItem
                                    key={world.id}
                                    value={world.id.toString()}
                                    className="text-gray-800 font-medium">
                                    {world.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Rarity Filter */}
                    <Select value={selectedRarity} onValueChange={handleRarityChange}>
                        <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20">
                            <SelectValue placeholder="Select Rarity" className="text-white" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" className="text-gray-800 font-medium">
                                All Rarities
                            </SelectItem>
                            {rarities.map((rarity) => (
                                <SelectItem key={rarity} value={rarity} className="text-gray-800 font-medium">
                                    <div className="flex items-center space-x-2">
                                        <div className="h-3 w-3 rounded-full" style={getRarityStyle(rarity)} />
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
                                <button
                                    type="button"
                                    className="ml-1 hover:text-red-500 transition-colors"
                                    onClick={() => setSearchTerm("")}>
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )}
                        {selectedWorld !== "all" && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                                World: {worlds.find((w) => w.id.toString() === selectedWorld)?.name}
                                <button
                                    type="button"
                                    className="ml-1 hover:text-red-500 transition-colors"
                                    onClick={() => setSelectedWorld("all")}>
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )}
                        {selectedRarity !== "all" && (
                            <Badge
                                variant="secondary"
                                className="flex items-center gap-1 text-white border-0"
                                style={getRarityStyle(selectedRarity)}>
                                {selectedRarity}
                                <button
                                    type="button"
                                    className="ml-1 hover:text-red-300 transition-colors"
                                    onClick={() => setSelectedRarity("all")}>
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )}
                    </div>
                )}
            </div>

            {/* Main Content - Avatars by World */}
            {Object.keys(avatarsByWorld).length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No worlds found matching your criteria.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(avatarsByWorld).map(([worldName, worldAvatars]) => (
                        <div key={worldName} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Globe className="h-5 w-5 text-blue-600" />
                                <h2 className="text-xl font-bold text-gray-200">{worldName}</h2>
                                <span className="text-sm font-semibold text-gray-200">
                                    ({worldAvatars.length} avatar{worldAvatars.length !== 1 ? "s" : ""})
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {worldAvatars.map((avatar, index) => {
                                    return (
                                        <Card
                                            key={`${avatar.worldName}-${avatar.name}-${index}`}
                                            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-opacity-50 relative overflow-hidden"
                                            style={{
                                                background: `linear-gradient(135deg, ${getRarityStyle(avatar.rarity).background}15, ${getRarityStyle(avatar.rarity).background}25)`,
                                                borderColor: getRarityStyle(avatar.rarity).background,
                                            }}>
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <Avatar
                                                            className="h-12 w-12"
                                                            style={getRarityStyle(avatar.rarity)}>
                                                            <div className="flex items-center justify-center h-full w-full text-white font-bold text-lg">
                                                                {avatar.name.charAt(0)}
                                                            </div>
                                                        </Avatar>
                                                        <div>
                                                            <CardTitle className="text-sm font-bold text-gray-200">
                                                                {avatar.name}
                                                            </CardTitle>
                                                            <p className="text-xs text-muted-foreground font-medium">
                                                                {avatar.worldName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-white border-0 font-semibold shadow-md"
                                                        style={getRarityStyle(avatar.rarity)}>
                                                        {avatar.rarity}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-0 space-y-2">
                                                <div
                                                    className="flex items-center justify-between rounded-md px-3 py-2 backdrop-blur-sm"
                                                    style={{
                                                        background: `${getRarityStyle(avatar.rarity).background}20`,
                                                        border: `1px solid ${getRarityStyle(avatar.rarity).background}40`,
                                                    }}>
                                                    <span className="text-xs font-medium text-gray-200">
                                                        Base Energy
                                                    </span>
                                                    <span className="font-bold text-sm text-gray-200">
                                                        {formatNumber(avatar.baseEnergy)}
                                                    </span>
                                                </div>
                                                <div
                                                    className="flex items-center justify-between rounded-md px-3 py-1 backdrop-blur-sm"
                                                    style={{
                                                        background: `${getRarityStyle(avatar.rarity).background}15`,
                                                        border: `1px solid ${getRarityStyle(avatar.rarity).background}30`,
                                                    }}>
                                                    <span className="text-xs font-medium text-gray-300">
                                                        Energy Lvl 100
                                                    </span>
                                                    <span className="font-semibold text-xs text-gray-200">
                                                        {formatNumber(
                                                            calculateEnergyWithUpgrade(avatar.baseEnergy, 100),
                                                        )}
                                                    </span>
                                                </div>
                                                <div
                                                    className="flex items-center justify-between rounded-md px-3 py-1 backdrop-blur-sm"
                                                    style={{
                                                        background: `${getRarityStyle(avatar.rarity).background}15`,
                                                        border: `1px solid ${getRarityStyle(avatar.rarity).background}30`,
                                                    }}>
                                                    <span className="text-xs font-medium text-gray-300">
                                                        Energy Lvl 150
                                                    </span>
                                                    <span className="font-semibold text-xs text-gray-200">
                                                        {formatNumber(
                                                            calculateEnergyWithUpgrade(avatar.baseEnergy, 150),
                                                        )}
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
