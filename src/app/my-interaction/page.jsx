import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { redirect } from 'next/navigation';
import { Avatar } from '@heroui/react';

const fetchInteractions = async(token) => {
    const response = await fetch(`${process.env.PUBLIC_ALL_API}/my-interactions`, {
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

export const metadata = {
    title: "My Interactions",
};

const MyInteractionPage = async() => {
    const tokenData = await auth.api.getToken({
        headers: await headers()
    });
    const token = tokenData?.token || "";
    
    if (!token) {
        redirect('/login');
    }

    const interactions = await fetchInteractions(token);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-transparent">
            <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                        My Interactions
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">
                        View ideas you've liked and comments you've made.
                    </p>
                </div>

                <div className="border-b border-slate-300 dark:border-slate-800 mb-8 flex">
                    <div className="border-b-2 border-blue-600 dark:border-blue-500 pb-3 px-2 -mb-[1px]">
                        <span className="font-bold text-blue-600 dark:text-blue-500 text-sm tracking-wide">
                            Comments ({interactions.length})
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    {interactions.length > 0 ? (
                        interactions.map((interaction, index) => (
                            <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md dark:hover:shadow-blue-900/10 transition-all duration-200">
                                <Link href={`/ideas/${interaction.ideaId}`} className="block group">
                                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-widest group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        On Idea: {interaction.IdeaTitle}
                                    </h3>
                                    <div className="flex gap-4">
                                        <Avatar name={interaction.user || 'U'} className="shrink-0 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-slate-100">{interaction.user || 'Unknown User'}</h4>
                                            <p className="text-slate-600 dark:text-slate-300 mt-1 mb-3 leading-relaxed">
                                                {interaction.comment}
                                            </p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                                                {new Date(interaction.date).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                            <p className="text-slate-500 dark:text-slate-400 text-lg">You haven't made any comments yet.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MyInteractionPage;
