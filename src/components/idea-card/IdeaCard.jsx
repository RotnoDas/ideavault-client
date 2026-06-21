import { Chip } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const IdeaCard = ({ idea }) => {
    return (
        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-blue-900/20">
            <div className="relative overflow-hidden aspect-16/10">
                <Image src={idea.ImageURL} alt={idea.IdeaTitle} className="object-cover group-hover:scale-110 transition-transform duration-700" fill loading="lazy" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"></Image>
                <div className="absolute top-4 right-4">
                    <Chip color="primary" variant="solid" className="font-bold shadow-lg shadow-blue-600/20">
                        {idea.Category}
                    </Chip>
                </div>
            </div>
            <div className="p-8 flex flex-col grow space-y-4">
                <div className="space-y-2">
                    <Link href={`/ideas/${idea._id}`} className="block">
                        <h3 className="text-xl font-bold leading-tight line-clamp-2 hover:text-blue-600 dark:text-slate-100 transition-colors">
                            {idea.IdeaTitle}
                        </h3>
                    </Link>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                        <span className="text-slate-900 dark:text-slate-300">{idea.ShortDescription}</span>
                    </p>
                </div>
                <div className="pt-6 mt-auto border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-2xl font-black text-blue-600">{idea.EstimatedBudget}</span>
                    <Link href={`/ideas/${idea._id}`} className="font-bold rounded-xl px-6 py-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 dark:text-slate-200">
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default IdeaCard;