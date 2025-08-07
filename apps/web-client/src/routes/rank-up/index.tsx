import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@anime-eternal-wiki/ui";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowBigUp, ArrowUp, Crown, TrendingUp, Zap } from "lucide-react";
import wikiData from "../../data/wiki-data.json";

export const Route = createFileRoute("/rank-up/")({
    component: RankUp,
});

function RankUp() {
    // Busca os dados do módulo rank-up
    const rankUpModule = wikiData.modules.find((module) => module.id === "rank-up");
    const ranks = rankUpModule?.data?.ranks || [];

    return (
        <main className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="relative inline-block mb-6">
                    <ArrowBigUp className="w-20 h-20 mx-auto text-blue-400" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-20 animate-pulse"></div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Rank Up System</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Master the progression system and unlock powerful energy multipliers as you climb through the ranks
                </p>
                <Badge variant="secondary" className="text-sm bg-yellow-500/20 text-yellow-200 border-yellow-500/30">
                    {ranks.length} Total Ranks Available
                </Badge>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="text-center pb-4">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-white text-lg">Max Rank</CardTitle>
                        <CardDescription className="text-gray-400 text-2xl font-bold">
                            {ranks[ranks.length - 1]?.currentRank || 0}
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="text-center pb-4">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-white text-lg">Max Energy Multiplier</CardTitle>
                        <CardDescription className="text-gray-400 text-2xl font-bold">
                            {ranks[ranks.length - 1]?.energyMultiplier || "0x"}
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="text-center pb-4">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center mb-4">
                            <ArrowUp className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-white text-lg">Final Requirement</CardTitle>
                        <CardDescription className="text-gray-400 text-2xl font-bold">
                            {ranks[ranks.length - 1]?.requirement || "0"}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            {/* Ranks Table */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <ArrowBigUp className="w-6 h-6 text-blue-400" />
                        Rank Progression Table
                    </h2>
                    <p className="text-gray-400 mt-2">Complete guide to rank requirements and energy multipliers</p>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 border-b border-white/10">
                    <div className="text-white font-semibold text-sm uppercase tracking-wide">Current Rank</div>
                    <div className="text-white font-semibold text-sm uppercase tracking-wide">Requirement</div>
                    <div className="text-white font-semibold text-sm uppercase tracking-wide">Energy Multiplier</div>
                </div>

                {/* Table Body */}
                <div className="max-h-96 overflow-y-auto">
                    {ranks.map((rank, index) => (
                        <div
                            key={rank.currentRank}
                            className={`grid grid-cols-3 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                                index % 2 === 0 ? "bg-white/2" : ""
                            }`}>
                            {/* Rank Column */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm">
                                    {rank.currentRank}
                                </div>
                                <span className="text-white font-medium">Rank {rank.currentRank}</span>
                            </div>

                            {/* Requirement Column */}
                            <div className="flex flex-col justify-center">
                                <span className="text-cyan-400 font-semibold">{rank.requirement}</span>
                                <span className="text-gray-500 text-xs">Required Power</span>
                            </div>

                            {/* Energy Multiplier Column */}
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-purple-400" />
                                <span className="text-purple-400 font-semibold">{rank.energyMultiplier}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-yellow-500/10 to-amber-600/10 border-yellow-500/20">
                    <CardHeader>
                        <CardTitle className="text-yellow-400 flex items-center gap-2">
                            <Crown className="w-5 h-5" />
                            How Ranking Works
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300 leading-relaxed">
                            As you progress through ranks, each level requires significantly more power but rewards you
                            with exponentially higher energy multipliers. Plan your progression carefully to maximize
                            efficiency.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-violet-600/10 border-purple-500/20">
                    <CardHeader>
                        <CardTitle className="text-purple-400 flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Energy Multipliers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300 leading-relaxed">
                            Energy multipliers boost your power generation exponentially. Higher ranks unlock massive
                            multipliers that can dramatically accelerate your progress through the game.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
