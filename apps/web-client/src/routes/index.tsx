import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator } from "@anime-eternal-wiki/ui";
import { cn } from "@anime-eternal-wiki/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Gem, Globe, MapPin, Shield, Sparkles, Sword, User } from "lucide-react";
import wikiData from "../data/wiki-data.json";

export const Route = createFileRoute("/")({
    component: Index,
});

// Icon mapping
const iconMap = {
    crown: Crown,
    user: User,
    shield: Shield,
    mapPin: MapPin,
    gem: Gem,
    globe: Globe,
    sparkles: Sparkles,
    sword: Sword,
} as const;

function Index() {
    const { modules } = wikiData;

    return (
        <>
            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="relative inline-block mb-6">
                        <img src="/logo.png" alt="Anime Eternal Logo" className="w-128 mx-auto" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 animate-pulse"></div>
                    </div>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        The complete guide to master the Anime Eternal universe. Explore systems, characters, equipment
                        and much more.
                    </p>
                    <Badge
                        variant="secondary"
                        className="text-sm bg-purple-500/20 text-purple-200 border-purple-500/30">
                        Last updated: August 7, 2025
                    </Badge>
                </div>

                <Separator className="mb-12 bg-white/10" />

                {/* Modules Grid */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Explore the Systems</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {modules
                            .filter((module) => module.enabled)
                            .map((module) => {
                                const IconComponent = iconMap[module.icon as keyof typeof iconMap];
                                const cardContent = (
                                    <Card
                                        key={module.id}
                                        className="group bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                                        <CardHeader className="text-center pb-4">
                                            <div
                                                className={cn(
                                                    "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-r transition-transform duration-300 group-hover:scale-110",
                                                    module.color,
                                                )}>
                                                <IconComponent className="w-8 h-8 text-white" />
                                            </div>
                                            <CardTitle className="text-white text-lg group-hover:text-purple-300 transition-colors">
                                                {module.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-center">
                                            <CardDescription className="text-gray-400 text-sm leading-relaxed">
                                                {module.description}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                );

                                if (module.id === "rank-up") {
                                    return (
                                        <Link key={module.id} to={module.href}>
                                            {cardContent}
                                        </Link>
                                    );
                                }

                                if (module.id === "avatar") {
                                    return (
                                        <Link key={module.id} to={module.href}>
                                            {cardContent}
                                        </Link>
                                    );
                                }

                                return cardContent;
                            })}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Wiki Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">150+</div>
                            <div className="text-gray-400 text-sm">Avatars</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-pink-400 mb-2">75+</div>
                            <div className="text-gray-400 text-sm">Champions</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-cyan-400 mb-2">200+</div>
                            <div className="text-gray-400 text-sm">Weapons</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-400 mb-2">50+</div>
                            <div className="text-gray-400 text-sm">Worlds</div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl mt-16">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-gray-400">
                        <p className="mb-2">
                            © 2025 Anime Eternal Wiki. Made with ❤️ by the community - @guilhermehpmoraes.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
