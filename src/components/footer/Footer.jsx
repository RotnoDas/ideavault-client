import React from 'react';
import Link from 'next/link';
import { Lightbulb, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-500 group-hover:rotate-12 transition-transform" />
                            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                                IdeaVault
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
                            A platform to share, validate, and refine innovative startup ideas with the community.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Platform</h3>
                        <ul className="space-y-3">
                            <li><Link href="/ideas" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Browse Ideas</Link></li>
                            <li><Link href="/add-idea" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Submit Idea</Link></li>
                            <li><Link href="/my-profile" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Profile</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Categories</h3>
                        <ul className="space-y-3">
                            <li><Link href="/ideas?category=Tech" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tech</Link></li>
                            <li><Link href="/ideas?category=AI" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">AI</Link></li>
                            <li><Link href="/ideas?category=Health" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Health</Link></li>
                            <li><Link href="/ideas?category=Education" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Education</Link></li>
                            <li><Link href="/ideas?category=Finance" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Finance</Link></li>
                            <li><Link href="/ideas?category=Productivity" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Productivity</Link></li>
                            <li><Link href="/ideas?category=E-commerce" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">E-commerce</Link></li>
                            <li><Link href="/ideas?category=Other" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Other</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Connect</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="X (Twitter)">
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="GitHub">
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                                </svg>
                            </a>
                            <a href="mailto:contact@ideavault.com" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="Email">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                        <a href="mailto:contact@ideavault.com" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            contact@ideavault.com
                        </a>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 text-center">
                        © {new Date().getFullYear()} IdeaVault. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;