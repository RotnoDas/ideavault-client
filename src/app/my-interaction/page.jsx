import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { redirect } from 'next/navigation';

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
        <div className="min-h-screen bg-slate-50">
            <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
                        My Interactions
                    </h1>
                    <p className="text-slate-500 text-lg">
                        View ideas you've liked and comments you've made.
                    </p>
                </div>

                <div className="border-b border-slate-300 mb-8 flex">
                    <div className="border-b-2 border-blue-600 pb-3 px-2 -mb-[1px]">
                        <span className="font-bold text-blue-600 text-sm tracking-wide">
                            Comments ({interactions.length})
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    {interactions.length > 0 ? (
                        interactions.map((interaction, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200">
                                <Link href={`/ideas/${interaction.ideaId}`} className="block group">
                                    <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        {interaction.IdeaTitle}
                                    </h3>
                                    <p className="text-slate-600 mb-4 leading-relaxed">
                                        {interaction.comment}
                                    </p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                                        {new Date(interaction.date).toLocaleDateString()}
                                    </p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                            <p className="text-slate-500 text-lg">You haven't made any comments yet.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MyInteractionPage;
