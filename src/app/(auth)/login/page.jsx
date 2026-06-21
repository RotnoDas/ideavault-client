'use client';
import { authClient } from '@/lib/auth-client';
import { Button, Input } from '@heroui/react';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect') || '/';

    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const loginData = Object.fromEntries(formData.entries());
        const { data, error } = await authClient.signIn.email({
            email: loginData.email,
            password: loginData.password,
            callbackURL: redirectUrl
        })
        const { data: JWTToken, error: JWTError } = await authClient.token()
        console.log("JWT Token", JWTToken)
        if (error) {
            toast.error(error.message || "Login failed. Please try again.");
            return;
        } else {
            toast.success("Login successful.");
            window.location.href = redirectUrl;
        }
    }

    const handleGoogleLogin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: redirectUrl
        });
    }
    return (
        <div className="min-h-[80vh] flex flex-col bg-slate-50 dark:bg-transparent">
            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl dark:shadow-blue-900/10 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                        <div className="text-center space-y-2 relative">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                Welcome <span className="text-blue-600 dark:text-blue-400">Back</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Continue your journey today</p>
                        </div>
                        <div className="space-y-4">
                            <Button onClick={handleGoogleLogin}
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
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-100 dark:border-slate-800"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 dark:text-slate-500 font-bold tracking-widest">Or with email</span>
                            </div>
                        </div>
                        <form
                            className="space-y-6"
                            onSubmit={handleLogin}
                        >
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
                            <div className="flex justify-end">
                                <Link
                                    href="/forget-password"
                                    className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 transition-all"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Button
                                color="primary"
                                type="submit"
                                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group"
                            >
                                Sign In <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>
                        <div className="text-center pt-2">
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                New to CourseHub?{' '}
                                <Link
                                    href="/register"
                                    className="text-blue-600 dark:text-blue-400 font-black hover:underline underline-offset-4 transition-all"
                                >
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LoginPage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
};

export default LoginPage;