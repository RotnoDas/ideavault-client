'use client';
import { Button, Input } from '@heroui/react';
import { ArrowLeft, KeyRound } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const ForgetPassword = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // UI only right now
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
            {/* Left side - Decorative */}
            <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-indigo-900"></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="2" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                <div className="relative z-10 p-12 text-white max-w-xl">
                    <div className="mb-8 p-4 bg-white/10 rounded-2xl w-fit backdrop-blur-sm border border-white/20">
                        <KeyRound className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                        Reset your password.
                    </h1>
                    <p className="text-blue-100 text-xl font-medium leading-relaxed">
                        Don't worry, it happens to the best of us. We'll send you secure instructions to get back into your account.
                    </p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-20">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <Link href="/" className="inline-block mb-10 group">
                            <div className="flex items-center gap-2">
                                <span className="font-extrabold text-2xl tracking-tight text-blue-600">
                                    IdeaVault
                                </span>
                            </div>
                        </Link>
                        
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Forgot Password</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {!isSubmitted ? (
                        <form className="space-y-6" onSubmit={handleSubmit}>
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
                                    className="border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white dark:bg-slate-900 w-full rounded-2xl text-slate-900 dark:text-white"
                                />
                            </div>

                            <Button
                                color="primary"
                                type="submit"
                                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20"
                            >
                                Send Reset Link
                            </Button>
                        </form>
                    ) : (
                        <div className="bg-green-50 text-green-800 p-6 rounded-2xl border border-green-200 text-center mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 text-2xl">
                                ✓
                            </div>
                            <h3 className="font-bold text-lg mb-2">Check your email</h3>
                            <p className="text-green-700/80">
                                We've sent password reset instructions to your email address.
                            </p>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
