import { Button } from "@anime-eternal-wiki/ui";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Home, Menu, Search, X } from "lucide-react";
import { useState } from "react";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl relative z-[9998]">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-3">
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
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link to="/">
                                <Button variant="ghost" className="text-gray-300 hover:text-white">
                                    Home
                                </Button>
                            </Link>
                            <Link to="/guides">
                                <Button variant="ghost" className="text-gray-300 hover:text-white">
                                    Guides
                                </Button>
                            </Link>
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
                                className="border-white/20 bg-white/5 hover:bg-white/10 md:hidden"
                                onClick={toggleMobileMenu}>
                                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className="absolute top-full left-0 right-0 bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl border-b border-white/10 md:hidden z-[9999]">
                            <nav className="container mx-auto px-4 py-6">
                                <div className="flex flex-col space-y-4">
                                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button
                                            variant="ghost"
                                            className="w-full text-left justify-start text-gray-300 hover:text-white hover:bg-white/10">
                                            Home
                                        </Button>
                                    </Link>
                                    <Link to="/guides" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button
                                            variant="ghost"
                                            className="w-full text-left justify-start text-gray-300 hover:text-white hover:bg-white/10">
                                            Guides
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        className="w-full text-left justify-start text-gray-300 hover:text-white hover:bg-white/10"
                                        onClick={() => setIsMobileMenuOpen(false)}>
                                        Community
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full text-left justify-start text-gray-300 hover:text-white hover:bg-white/10"
                                        onClick={() => setIsMobileMenuOpen(false)}>
                                        Updates
                                    </Button>
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            <Outlet />
            <TanStackRouterDevtools />
        </div>
    );
}
