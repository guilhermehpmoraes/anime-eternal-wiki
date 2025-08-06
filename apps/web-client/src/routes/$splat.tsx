import { Button } from "@anime-eternal-wiki/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Clock, Home } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/$splat")({
    component: NotFoundComponent,
});

function NotFoundComponent() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    navigate({ to: "/" });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const handleGoHome = () => {
        navigate({ to: "/" });
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                {/* 404 Icon */}
                <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-black font-bold text-sm">!</span>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
                    <p className="text-gray-400 mb-6">
                        Oops! The page you're looking for doesn't exist in our anime universe.
                    </p>
                </div>

                {/* Countdown Timer */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Clock className="w-5 h-5 text-purple-400 mr-2" />
                        <span className="text-gray-300">Auto redirect in</span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{countdown}</div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${((5 - countdown) / 5) * 100}%` }}></div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <Button
                        onClick={handleGoHome}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3">
                        <Home className="w-4 h-4 mr-2" />
                        Go Home Now
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white">
                        Go Back
                    </Button>
                </div>

                {/* Fun Message */}
                <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-sm text-purple-300">
                        🌟 <strong>Pro Tip:</strong> Use the navigation above to explore our anime wiki!
                    </p>
                </div>
            </div>
        </div>
    );
}
