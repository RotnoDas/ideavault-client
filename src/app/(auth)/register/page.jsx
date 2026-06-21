'use client';
import { authClient } from '@/lib/auth-client';
import { Button, Input } from '@heroui/react';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const router = useRouter();
    const handleRegister = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const registerData = Object.fromEntries(formData.entries());
        const { data, error } = await authClient.signUp.email({
            email: registerData.email,
            password: registerData.password,
            name: registerData.name,
            image: registerData.image
        });
        if (error) {
            toast.error(error.message || "Registration failed. Please try again.");
            return;
        } else {
            toast.success("Registration successful.");
            router.push("/");
        }
    }

    const handleGoogleLogin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }
    return (
        <div className="min-h-[80vh] flex flex-col bg-slate-50 dark:bg-transparent py-12">
            <div className="grow flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl dark:shadow-blue-900/10 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                        <div className="text-center space-y-2 relative">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                Join <span className="text-blue-600 dark:text-blue-400">IdeaVault</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Create your account to sharing your ideas</p>
                        </div>
                        <form className="space-y-6" onSubmit={handleRegister}>
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                                >
                                    Full Name
                                </label>
                                <Input
                                    id="name"
                                    required
                                    placeholder="Enter your name"
                                    name="name"
                                    className="border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white dark:bg-slate-800 w-full rounded-2xl text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                                >
                                    Email Address
                                </label>
                                <Input
                                    id="email"
                                    required
                                    placeholder="Enter your email"
                                    type="email"
                                    name="email"
                                    className="border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white dark:bg-slate-800 w-full rounded-2xl text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="image"
                                    className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                                >
                                    Profile Image URL
                                </label>
                                <Input
                                    id="image"
                                    placeholder="https://images.unsplash.com/..."
                                    type="url"
                                    name="image"
                                    className="border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white dark:bg-slate-800 w-full rounded-2xl text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                                >
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    required
                                    placeholder="••••••••"
                                    type="password"
                                    name="password"
                                    className="border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white dark:bg-slate-800 w-full rounded-2xl text-slate-900 dark:text-white"
                                />
                            </div>
                            <Button
                                color="primary"
                                type="submit"
                                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group"
                            >
                                Create Account <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>
                        <div className="space-y-4">
                            <Button 
                                onClick={handleGoogleLogin}
                                variant="bordered"
                                className="w-full h-12 font-bold rounded-2xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors gap-3 dark:text-slate-200"
                            >
                                <Image
                                    width={20}
                                    height={20}
                                    src="https://www.google.com/favicon.ico"
                                    className="w-5 h-5"
                                    alt="Google"
                                />
                                Sign in with Google
                            </Button>
                        </div>
                        <div className="text-center pt-2">
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="text-blue-600 dark:text-blue-400 font-black hover:underline underline-offset-4 transition-all"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;