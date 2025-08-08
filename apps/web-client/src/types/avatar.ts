export interface Avatar {
    name: string;
    rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Mythical" | "Phantom";
    baseEnergy: number;
}

export interface World {
    id: number;
    name: string;
    avatars: Avatar[];
}

export const RARITY_COLORS = {
    COMMON: "from-gray-400 to-gray-500",
    UNCOMMON: "from-green-400 to-green-500",
    RARE: "from-blue-400 to-blue-500",
    EPIC: "from-purple-400 to-purple-500",
    LEGENDARY: "from-yellow-400 to-yellow-500",
    MYTHICAL: "from-red-400 to-red-500",
    PHANTOM: "from-pink-400 to-pink-500",
} as const;

export const RARITY_ORDER = {
    COMMON: 1,
    UNCOMMON: 2,
    RARE: 3,
    EPIC: 4,
    LEGENDARY: 5,
    MYTHICAL: 6,
    PHANTOM: 7,
} as const;
