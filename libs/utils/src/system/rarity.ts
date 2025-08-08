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
    COMMON: { background: "#868686" },
    UNCOMMON: { background: "#00ff00" },
    RARE: { background: "#27dbff" },
    EPIC: { background: "#c800ff" },
    LEGENDARY: { background: "#ffc82d" },
    MYTHICAL: { background: "#ff0000" },
    PHANTOM: { background: "#450067" },
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
