'use client';
import Link from 'next/link';
import { Button } from '@heroui/react';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center bg-slate-50/50 dark:bg-transparent">
            <div className="space-y-8 max-w-2xl mx-auto">
                {/* Visual Element */}
                <div className="relative">
                    <div className="text-[150px] sm:text-[200px] font-black text-transparent bg-clip-text bg-linear-to-br from-blue-600 to-blue-300 leading-none select-none drop-shadow-sm">
                        404
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center -z-10 opacity-30 blur-3xl rounded-full bg-blue-400"></div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Oops! Page not found
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Or perhaps, the idea was just too innovative for this URL!
                    </p>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/">
                        <Button color="primary" size="lg" className="font-bold shadow-lg shadow-blue-600/20 px-8">
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/my-idea">
                        <Button variant="flat" size="lg" className="font-bold bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 px-8 dark:text-white hover:dark:bg-slate-700">
                            My Ideas
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}