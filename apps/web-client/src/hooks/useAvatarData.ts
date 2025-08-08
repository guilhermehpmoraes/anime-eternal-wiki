import type { AvatarWithWorld, World } from "@anime-eternal-wiki/utils";
import { useMemo } from "react";
import wikiData from "../data/wiki-data.json";

export function useAvatarData() {
    const worldsData = useMemo(() => {
        const worldsModule = wikiData.modules.find((module) => module.id === "worlds");
        return (worldsModule?.data?.worlds as World[]) || [];
    }, []);

    const allAvatars = useMemo<AvatarWithWorld[]>(() => {
        return worldsData.flatMap((world) =>
            world.avatars.map((avatar) => ({
                ...avatar,
                worldName: world.name,
                worldId: world.id,
            })),
        );
    }, [worldsData]);

    const getAvatarsByWorld = (worldId?: number): AvatarWithWorld[] => {
        if (!worldId) return allAvatars;
        const world = worldsData.find((w) => w.id === worldId);
        return (
            world?.avatars.map((avatar) => ({
                ...avatar,
                worldName: world.name,
                worldId: world.id,
            })) || []
        );
    };

    const getAvatarsByRarity = (rarity?: string): AvatarWithWorld[] => {
        if (!rarity) return allAvatars;
        return allAvatars.filter((avatar) => avatar.rarity === rarity);
    };

    const filterAvatars = (worldId?: number, rarity?: string, searchTerm?: string): AvatarWithWorld[] => {
        let filtered = allAvatars;

        if (worldId) {
            filtered = getAvatarsByWorld(worldId);
        }

        if (rarity) {
            filtered = filtered.filter((avatar) => avatar.rarity === rarity);
        }

        if (searchTerm) {
            filtered = filtered.filter(
                (avatar) =>
                    avatar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    avatar.worldName.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        return filtered;
    };

    return {
        worlds: worldsData,
        allAvatars,
        getAvatarsByWorld,
        getAvatarsByRarity,
        filterAvatars,
    };
}
