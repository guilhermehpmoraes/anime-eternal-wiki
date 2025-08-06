import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@anime-eternal-wiki/ui";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Target, Users, Zap } from "lucide-react";

export const Route = createFileRoute("/guides")({
    component: Guides,
});

function Guides() {
    const guideCategories = [
        {
            title: "Beginner's Guide",
            description: "Essential tips for new players starting their journey",
            icon: BookOpen,
            color: "from-green-500 to-emerald-600",
            guides: ["Getting Started", "Basic Controls", "Character Creation"],
        },
        {
            title: "Combat Guides",
            description: "Master the art of battle and combat mechanics",
            icon: Target,
            color: "from-red-500 to-pink-600",
            guides: ["Combat Basics", "Skill Rotations", "PvP Strategies"],
        },
        {
            title: "Team & Guild",
            description: "Learn about teamwork and guild management",
            icon: Users,
            color: "from-blue-500 to-cyan-600",
            guides: ["Team Formation", "Guild Creation", "Raid Strategies"],
        },
        {
            title: "Advanced Tips",
            description: "Pro strategies and advanced techniques",
            icon: Zap,
            color: "from-purple-500 to-violet-600",
            guides: ["Min-Maxing", "End-game Content", "Meta Analysis"],
        },
    ];

    return (
        <>
            <main className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Game Guides</h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Comprehensive guides to help you master every aspect of Anime Eternal
                    </p>
                    <Badge variant="secondary" className="text-sm bg-blue-500/20 text-blue-200 border-blue-500/30">
                        Updated Weekly
                    </Badge>
                </div>

                {/* Guide Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {guideCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <Card
                                key={category.title}
                                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                                <CardHeader>
                                    <div className="flex items-center space-x-4">
                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${category.color}`}>
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-white text-xl">{category.title}</CardTitle>
                                            <CardDescription className="text-gray-400">
                                                {category.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {category.guides.map((guide) => (
                                            <div
                                                key={guide}
                                                className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                                                <span className="text-gray-300 hover:text-white transition-colors">
                                                    {guide}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Featured Guide */}
                <div className="mt-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30">
                    <h2 className="text-2xl font-bold text-white mb-4">Featured Guide</h2>
                    <h3 className="text-xl text-purple-300 mb-2">Complete Beginner's Roadmap</h3>
                    <p className="text-gray-300 mb-4">
                        A comprehensive step-by-step guide that takes you from creating your first character to
                        understanding end-game mechanics. Perfect for new players!
                    </p>
                    <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30">Most Popular</Badge>
                </div>
            </main>
        </>
    );
}
