'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { Rocket, ArrowRight } from 'lucide-react';

const CallToAction = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-linear-to-br from-blue-600 to-indigo-800 rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-900/20">
                    {/* Decorative abstract background shapes */}
                    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 border border-white/20 shadow-inner">
                            <Rocket className="w-10 h-10 text-white" strokeWidth={1.5} />
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                            Ready to launch your next big thing?
                        </h2>
                        
                        <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
                            Join thousands of creators, founders, and developers turning abstract concepts into reality on IdeaVault today.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <Link 
                                href="/ideas"
                                className="bg-white text-blue-700 font-bold px-10 py-7 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-lg flex items-center justify-center"
                            >
                                Explore Ideas
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link 
                                href="/login"
                                className="border-2 border-blue-200/30 text-white font-bold px-10 py-7 rounded-2xl hover:bg-white/10 transition-all text-lg flex items-center justify-center"
                            >
                                Join Community
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
