import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import { redirect } from 'next/navigation';
import MyIdeaCard from '@/components/my-idea/MyIdeaCard';

const fetchMyIdeas = async(token) => {
    const response = await fetch('http://localhost:8000/my-ideas', {
        headers: {
            authorization: `Bearer ${token}` || ""
        },
        cache: 'no-store'
    });
    if (!response.ok) {
        return [];
    }
    const data = await response.json();
    return data;
}

const MyIdeaPage = async() => {
    const tokenData = await auth.api.getToken({
        headers: await headers()
    });
    const token = tokenData?.token || "";
    
    if (!token) {
        redirect('/login');
    }

    const ideas = await fetchMyIdeas(token);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-transparent">
            <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                        My Ideas
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">
                        Manage and edit your submitted startup concepts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {ideas.length > 0 ? (
                        ideas.map((idea) => (
                            <MyIdeaCard key={idea._id} idea={idea} token={token} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">No ideas yet</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">You have not submitted any ideas to the vault.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MyIdeaPage;