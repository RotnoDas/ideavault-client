import Tags from '@/components/tags/Tags';
import { auth } from '@/lib/auth';
import { Chip, ColorSwatch } from '@heroui/react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import CommentSection from '@/components/comment-section/CommentSection';

const fetchSingleIdea = async(id, token) => {
    const response = await fetch(`${process.env.PUBLIC_ALL_API}/ideas/${id}`, {
        headers: {
            authorization: `Bearer ${token}` || ""
        }
    });
    if (!response.ok) {
        return null;
    }
    const idea = await response.json();
    return idea;
}
const IdeaDetailsPage = async({params}) => {
    const tokenData = await auth.api.getToken({
        headers: await headers()
    });
    const token = tokenData?.token || "";
    const {id} = await params;
    const data = await fetchSingleIdea(id, token);
    
    if (!data) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl aspect-video">
                        <Image
                            src={data.ImageURL}
                            alt={data.IdeaTitle}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            className="object-cover transform transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-6 left-6">
                            <Chip
                                color="primary"
                                variant="solid"
                                className="font-bold shadow-xl"
                            >
                                {data.Category}
                            </Chip>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            {data.IdeaTitle}
                        </h1>
                        <p className="text-xl text-slate-500 leading-relaxed">
                            {data.DetailedDescription}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-8 border-t border-border">
                        {
                            (Array.isArray(data.Tags) 
                                ? data.Tags 
                                : typeof data.Tags === 'string' && data.Tags.trim() !== ''
                                    ? data.Tags.split(',') 
                                    : []
                            ).map((tag, index) => {
                                return(
                                    <Tags key={index} tag={typeof tag === 'string' ? tag.trim() : tag}></Tags>
                                )
                            })
                        }
                    </div>
                    
                    <CommentSection 
                        ideaId={id} 
                        initialComments={data.comments || []} 
                        apiBaseUrl={process.env.PUBLIC_ALL_API} 
                        token={token}
                    />
                </div>
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 shadow-2xl space-y-8">
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Budget</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-blue-600">{data.EstimatedBudget}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="w-full h-px bg-slate-100"></div>
                            <div className="text-xl font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                <ColorSwatch color="#0485F7" size="xs" />
                                Target Audience:
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm font-normal text-black">{data.TargetAudience}</span>
                            </div>
                            <div className="text-xl font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                <ColorSwatch color="#0485F7" size="xs" />
                                Problem Statement:
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm font-normal text-black">{data.ProblemStatement}</span>
                            </div>
                            <div className="text-xl font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                <ColorSwatch color="#0485F7" size="xs" />
                                Proposed Solution:
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm font-normal text-black">{data.ProposedSolution}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdeaDetailsPage;