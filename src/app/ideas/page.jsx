import IdeaCard from '@/components/idea-card/IdeaCard';
import Search from '@/components/search/Search';
import { fetchIdeas } from '@/lib/fetchIdeas';
import React from 'react';

const IdeasPage = async ({ searchParams }) => {
    const searchParamsData = await searchParams;
    const searchTerm = searchParamsData.search || '';
    const data = await fetchIdeas(searchTerm);
    return (
        <div className="min-h-screen bg-slate-50">
            <Search></Search>
            <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        {searchTerm ? `Search Results for "${searchTerm}"` : 'All Ideas'}
                    </h2>
                </div>
                {data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((idea) => (
                            <IdeaCard key={idea._id} idea={idea}></IdeaCard>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-slate-50 rounded-full">
                                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No ideas found</h3>
                        <p className="text-slate-500">
                            We couldn't find any ideas matching "{searchTerm}". Try adjusting your search or browsing all ideas.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default IdeasPage;