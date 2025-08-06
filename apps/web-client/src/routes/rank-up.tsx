import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator } from "@anime-eternal-wiki/ui";
import { createFileRoute } from "@tanstack/react-router";
import { Crown, Gem, Star, Target, Trophy, Zap } from "lucide-react";

export const Route = createFileRoute("/rank-up")({
    component: RankUp,
});

function RankUp() {
    const ranks = [
        { name: "Bronze", color: "from-amber-600 to-amber-800", level: "1-10", icon: Crown },
        { name: "Silver", color: "from-gray-400 to-gray-600", level: "11-25", icon: Star },
        { name: "Gold", color: "from-yellow-400 to-yellow-600", level: "26-40", icon: Trophy },
        { name: "Platinum", color: "from-cyan-400 to-cyan-600", level: "41-55", icon: Gem },
        { name: "Diamond", color: "from-blue-400 to-blue-600", level: "56-70", icon: Zap },
        { name: "Master", color: "from-purple-400 to-purple-600", level: "71+", icon: Target },
    ];

    const requirements = [
        {
            title: "Experience Points",
            description: "Gain XP through battles, quests, and challenges",
            value: "500-2000 XP per rank",
            color: "text-green-400",
        },
        {
            title: "Win Rate",
            description: "Maintain a good performance in ranked matches",
            value: "60%+ win rate",
            color: "text-blue-400",
        },
        {
            title: "Special Achievements",
            description: "Complete specific challenges for bonus progress",
            value: "Varies by rank",
            color: "text-purple-400",
        },
    ];

    return (
        <>
            <main className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Rank Up System</h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Climb the ladder and prove your worth in the competitive arena
                    </p>
                    <Badge
                        variant="secondary"
                        className="text-sm bg-yellow-500/20 text-yellow-200 border-yellow-500/30">
                        Season 2024
                    </Badge>
                </div>

                {/* Rank Tiers */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Rank Tiers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ranks.map((rank) => {
                            const IconComponent = rank.icon;
                            return (
                                <Card
                                    key={rank.name}
                                    className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                                    <CardHeader className="text-center">
                                        <div
                                            className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-r ${rank.color}`}>
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <CardTitle className="text-white text-xl">{rank.name}</CardTitle>
                                        <CardDescription className="text-gray-400">Level {rank.level}</CardDescription>
                                    </CardHeader>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                <Separator className="mb-12 bg-white/10" />

                {/* Requirements */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Ranking Requirements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {requirements.map((req) => (
                            <Card
                                key={req.title}
                                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="text-white text-lg">{req.title}</CardTitle>
                                    <CardDescription className="text-gray-400">{req.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className={`text-lg font-bold ${req.color}`}>{req.value}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Season Info */}
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-blue-500/30">
                    <h2 className="text-2xl font-bold text-white mb-4">Current Season</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-blue-300 mb-2">
                                Season 2024 - "Eternal Ascension"
                            </h3>
                            <p className="text-gray-300 mb-4">
                                Compete against players worldwide and earn exclusive rewards for reaching higher ranks.
                            </p>
                            <Badge className="bg-blue-500/20 text-blue-200 border-blue-500/30 mr-2">Active Now</Badge>
                            <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                Ends: Dec 31, 2024
                            </Badge>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-purple-300 mb-2">Season Rewards</h3>
                            <ul className="text-gray-300 space-y-1">
                                <li>• Exclusive rank badges</li>
                                <li>• Special character skins</li>
                                <li>• Rare equipment upgrades</li>
                                <li>• Bonus experience multipliers</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
