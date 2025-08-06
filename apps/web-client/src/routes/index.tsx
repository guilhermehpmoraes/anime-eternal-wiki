import {
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Separator,
} from "@anime-eternal-wiki/ui";
import { cn } from "@anime-eternal-wiki/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Crown, Gem, Globe, Home, MapPin, Menu, Search, Shield, Sparkles, Sword, User } from "lucide-react";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const modules = [
        {
            id: "rank-up",
            title: "Rank Up",
            description: "Progression system and rankings",
            icon: Crown,
            color: "from-yellow-500 to-amber-600",
            href: "/rank-up",
        },
        {
            id: "avatar-index",
            title: "Avatar Index",
            description: "Complete avatar catalog",
            icon: User,
            color: "from-blue-500 to-cyan-600",
            href: "/avatars",
        },
        {
            id: "champion-index",
            title: "Champion Index",
            description: "Guide to all champions",
            icon: Shield,
            color: "from-red-500 to-pink-600",
            href: "/champions",
        },
        {
            id: "dungeons",
            title: "Dungeons",
            description: "Dungeons and their rewards",
            icon: MapPin,
            color: "from-purple-500 to-violet-600",
            href: "/dungeons",
        },
        {
            id: "jewelry",
            title: "Jewelry",
            description: "Special jewels and accessories",
            icon: Gem,
            color: "from-emerald-500 to-teal-600",
            href: "/jewelry",
        },
        {
            id: "worlds",
            title: "Worlds",
            description: "Worlds and locations",
            icon: Globe,
            color: "from-indigo-500 to-blue-600",
            href: "/worlds",
        },
        {
            id: "auras",
            title: "Auras",
            description: "Special effects and auras",
            icon: Sparkles,
            color: "from-pink-500 to-rose-600",
            href: "/auras",
        },
        {
            id: "weapons",
            title: "Weapons",
            description: "Complete weapon arsenal",
            icon: Sword,
            color: "from-orange-500 to-red-600",
            href: "/weapons",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <Home className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Anime Eternal</h1>
                                <p className="text-xs text-gray-400">Wiki & Guide</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <Button variant="ghost" className="text-gray-300 hover:text-white">
                                Home
                            </Button>
                            <Button variant="ghost" className="text-gray-300 hover:text-white">
                                Guides
                            </Button>
                            <Button variant="ghost" className="text-gray-300 hover:text-white">
                                Community
                            </Button>
                            <Button variant="ghost" className="text-gray-300 hover:text-white">
                                Updates
                            </Button>
                        </nav>

                        {/* Search & Menu */}
                        <div className="flex items-center space-x-3">
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-white/20 bg-white/5 hover:bg-white/10">
                                <Search className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-white/20 bg-white/5 hover:bg-white/10 md:hidden">
                                <Menu className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="relative inline-block mb-6">
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                            Anime Eternal
                        </h1>
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 animate-pulse"></div>
                    </div>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        The complete guide to master the Anime Eternal universe. Explore systems, characters, equipment
                        and much more.
                    </p>
                    <Badge
                        variant="secondary"
                        className="text-sm bg-purple-500/20 text-purple-200 border-purple-500/30">
                        Last updated: August 6, 2025
                    </Badge>
                </div>

                <Separator className="mb-12 bg-white/10" />

                {/* Modules Grid */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Explore the Systems</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {modules.map((module) => {
                            const IconComponent = module.icon;
                            return (
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
                        <p className="mb-2">© 2025 Anime Eternal Wiki. Made with ❤️ by the community.</p>
                        <p className="text-sm">This is an unofficial community project.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
