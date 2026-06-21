import React from 'react';
import { Zap, Users, TrendingUp } from 'lucide-react';

const steps = [
    {
        title: 'Share Idea',
        description: 'Post your innovative startup concept to get initial feedback from the community.',
        icon: Zap
    },
    {
        title: 'Collaborate',
        description: 'Engage with interested founders, developers, and designers to build a team.',
        icon: Users
    },
    {
        title: 'Validate & Grow',
        description: 'Iterate based on user feedback and take your product to the next level.',
        icon: TrendingUp
    }
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        How It Works
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        Your journey from an abstract concept to a validated startup idea.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:shadow-blue-900/10 transition-shadow">
                                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{step.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
