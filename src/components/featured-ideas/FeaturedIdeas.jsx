import { featuredIdeas, fetchIdeas } from '@/lib/fetchIdeas';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import IdeaCard from '../idea-card/IdeaCard';

const FeaturedIdeas = async() => {
    const ideas = await featuredIdeas();
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="space-y-4">
                        <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Top Rated</h2>
                        <h3 className="text-4xl font-extrabold text-slate-900">Featured Ideas</h3>
                        <p className="text-slate-500 max-w-xl">
                            Handpicked innovative ideas designed to inspire creativity, solve real-world problems, and spark your next big venture.
                        </p>
                    </div>
                    <Link href="/ideas" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors">
                        View All Ideas
                        <ArrowRight size={18} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        ideas.map((idea) => {
                            return (
                                <IdeaCard key={idea._id} idea={idea}></IdeaCard>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default FeaturedIdeas;