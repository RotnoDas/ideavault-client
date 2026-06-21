import React from 'react';
import { Cpu, Brain, Heart, BookOpen, DollarSign, Briefcase } from 'lucide-react';

const categories = [
    { name: 'Tech', icon: Cpu },
    { name: 'AI', icon: Brain },
    { name: 'Health', icon: Heart },
    { name: 'Education', icon: BookOpen },
    { name: 'Finance', icon: DollarSign },
    { name: 'Productivity', icon: Briefcase },
];

const Categories = () => {
    return (
        <section className="py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Popular Categories
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        Explore startup concepts across various industries.
                    </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <div 
                                key={category.name} 
                                className="flex flex-col items-center justify-center bg-slate-50/70 dark:bg-slate-800/70 w-32 h-32 md:w-44 md:h-40 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-md hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer group"
                            >
                                <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                                <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm md:text-base">{category.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Categories;
