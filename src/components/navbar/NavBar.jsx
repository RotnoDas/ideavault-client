'use client';
import { authClient, signOut } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { BookOpen, LayoutDashboard, Lightbulb, LogOut, Menu, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const NavBar = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const handleLogout = async() => {
        await signOut();
        toast.success("Logged out successfully");
        router.refresh();
        router.push("/login");
        setIsMenuOpen(false);
    }
    const { data: session, isPending } = authClient.useSession();
    return (
        <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/70 backdrop-blur-md shadow-sm py-2" : "bg-slate-50 py-4"
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-blue-600 rounded-xl group-hover:rotate-12 transition-transform">
                                <Lightbulb className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                                IdeaVault
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex gap-8 items-center">
                        <Link href="/" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">Home</Link>
                        <Link href="/ideas" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">Ideas</Link>
                        <Link href="/add-idea" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">Add Idea</Link>
                        <Link href="/my-idea" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">My Idea</Link>
                        <Link href="/my-interaction" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">My Interaction</Link>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        {
                            isPending ? (
                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-4 bg-slate-200 animate-pulse rounded"></div>
                                    <div className="w-24 h-10 bg-slate-200 animate-pulse rounded-full"></div>
                                </div>
                            ) : !session ? (
                                <>
                                    <Link href="/login" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">Login</Link>
                                    <Link href="/register">
                                        <Button color="primary" className="font-bold rounded-full px-8 shadow-lg shadow-blue-600/20">
                                            Join Free
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <div className="relative group">
                                    <button className="flex items-center gap-3 p-1 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border">
                                        <Image
                                            width={40}
                                            height={40}
                                            src={session?.user?.image || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                            referrerPolicy="no-referrer"
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/10"
                                        />
                                        <div className="text-left hidden lg:block">
                                            <p className="text-sm font-bold truncate max-w-25">{session?.user?.name}</p>
                                        </div>
                                    </button>
                                    <div className="absolute right-0 top-12 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-3 border-b border-slate-100">
                                            <p className="font-bold text-sm">Welcome back!</p>
                                            <p className="text-xs truncate text-slate-500">{session?.user?.email}</p>
                                        </div>
                                        <Link href="/my-profile" className="px-4 py-2 text-sm hover:bg-muted flex items-center gap-3 transition-colors">
                                            <LayoutDashboard className="w-4 h-4" /> My Profile
                                        </Link>
                                        <Link href="/my-idea" className="px-4 py-2 text-sm hover:bg-muted flex items-center gap-3 transition-colors">
                                            <User className="w-4 h-4" /> My Idea
                                        </Link>
                                        <Link href="/my-interaction" className="px-4 py-2 text-sm hover:bg-muted flex items-center gap-3 transition-colors">
                                            <User className="w-4 h-4" /> My Interaction
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors text-left">
                                            <LogOut className="w-4 h-4" /> Log Out
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden px-4 pt-2 pb-6 space-y-2 bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300 shadow-lg">
                    <Link onClick={() => setIsMenuOpen(false)} href="/" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">Home</Link>
                    <Link onClick={() => setIsMenuOpen(false)} href="/ideas" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">Ideas</Link>
                    <Link onClick={() => setIsMenuOpen(false)} href="/add-idea" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">Add Idea</Link>
                    <Link onClick={() => setIsMenuOpen(false)} href="/my-idea" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">My Idea</Link>
                    <Link onClick={() => setIsMenuOpen(false)} href="/my-interaction" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">My Interaction</Link>
                    
                    <div className="pt-4 border-t border-border mt-4">
                        {isPending ? (
                            <div className="flex flex-col gap-2">
                                <div className="w-full h-12 bg-slate-100 animate-pulse rounded-xl"></div>
                            </div>
                        ) : !session ? (
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="bordered" className="w-full rounded-xl font-bold">Login</Button>
                                </Link>
                                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                    <Button color="primary" className="w-full rounded-xl font-bold">Join Free</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-1">
                                <div className="px-4 py-2 mb-2 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="font-bold text-sm text-slate-900">{session?.user?.name}</p>
                                    <p className="text-xs text-slate-500 truncate">{session?.user?.email}</p>
                                </div>
                                
                                <p className="px-4 pt-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Account</p>
                                
                                <Link href="/my-profile" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl flex items-center gap-3">
                                    <LayoutDashboard className="w-5 h-5 text-slate-500" /> My Profile
                                </Link>
                                
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 rounded-xl flex items-center gap-3"
                                >
                                    <LogOut className="w-5 h-5" /> Log Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;