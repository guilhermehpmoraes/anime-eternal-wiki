import { Rarity } from "./rarity.js";

export interface Avatar {
    name: string;
    rarity: Rarity;
    baseEnergy: number;
}

export interface World {
    id: number;
    name: string;
    avatars: Avatar[];
}

// Extended Avatar type for UI with world information
export interface AvatarWithWorld extends Avatar {
    worldName: string;
    worldId: number;
}
