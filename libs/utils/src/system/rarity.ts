export type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Mythical" | "Phantom";

export const RARITY_COLORS = {
    COMMON: "from-gray-400 to-gray-500",
    UNCOMMON: "from-green-400 to-green-500",
    RARE: "from-blue-400 to-blue-500",
    EPIC: "from-purple-400 to-purple-500",
    LEGENDARY: "from-yellow-400 to-yellow-500",
    MYTHICAL: "from-red-400 to-red-500",
    PHANTOM: "from-pink-400 to-pink-500",
} as const;

export const RARITY_STYLES = {
    COMMON: { background: "linear-gradient(to right, #9CA3AF, #6B7280)" },
    UNCOMMON: { background: "linear-gradient(to right, #4ADE80, #22C55E)" },
    RARE: { background: "linear-gradient(to right, #60A5FA, #3B82F6)" },
    EPIC: { background: "linear-gradient(to right, #C084FC, #A855F7)" },
    LEGENDARY: { background: "linear-gradient(to right, #FACC15, #EAB308)" },
    MYTHICAL: { background: "linear-gradient(to right, #F87171, #EF4444)" },
    PHANTOM: { background: "linear-gradient(to right, #F472B6, #EC4899)" },
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

/**
 * Helper function to get the color class for a given rarity
 */
export function getRarityColor(rarity: Rarity): string {
    return RARITY_COLORS[rarity.toUpperCase() as keyof typeof RARITY_COLORS];
}

/**
 * Helper function to get the inline style for a given rarity
 */
export function getRarityStyle(rarity: Rarity): { background: string } {
    return RARITY_STYLES[rarity.toUpperCase() as keyof typeof RARITY_STYLES];
}

/**
 * Helper function to get the order/priority of a rarity
 */
export function getRarityOrder(rarity: Rarity): number {
    return RARITY_ORDER[rarity.toUpperCase() as keyof typeof RARITY_ORDER];
}

/**
 * Helper function to sort items by rarity (highest rarity first)
 */
export function sortByRarity<T extends { rarity: Rarity }>(items: T[]): T[] {
    return items.sort((a, b) => getRarityOrder(b.rarity) - getRarityOrder(a.rarity));
}
