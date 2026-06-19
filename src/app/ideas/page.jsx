import IdeaCard from '@/components/idea-card/IdeaCard';
import { fetchIdeas } from '@/lib/fetchIdeas';
import React from 'react';

const IdeasPage = async () => {
    const data = await fetchIdeas();
    return (
        <div className="min-h-screen bg-slate-50">
            <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        All Courses
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        data.map((idea) => {
                            return(
                                <IdeaCard key={idea._id} idea={idea}></IdeaCard>
                            )
                        })
                    }
                </div>
            </main>
        </div>
    );
};

export default IdeasPage;