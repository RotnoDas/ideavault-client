'use client';
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CATEGORIES = [
    'Tech',
    'AI',
    'Health',
    'Education',
    'Finance',
    'Productivity',
    'E-commerce',
    'Other'
];

const AddIdeaPage = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const newIdea = Object.fromEntries(formData.entries());

        if (typeof newIdea.Tags === 'string') {
            newIdea.Tags = newIdea.Tags.split(',').map(tag => tag.trim()).filter(Boolean);
        } else if (!newIdea.Tags) {
            newIdea.Tags = [];
        }

        if (!newIdea.IdeaTitle || !newIdea.Category || !newIdea.ShortDescription || !newIdea.DetailedDescription) {
            toast.error("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }

        try {
            const { data: session } = await authClient.getSession();
            if (!session) {
                toast.error("You must be logged in to submit an idea.");
                router.push("/login?redirect=/add-idea");
                return;
            }

            const { data: tokenObj } = await authClient.token();
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_ALL_API || "http://localhost:8000"}/ideas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenObj?.token || ''}`
                },
                body: JSON.stringify(newIdea)
            });

            if (response.ok) {
                toast.success("Idea submitted successfully!");
                router.push("/ideas");
            } else {
                const errData = await response.json();
                toast.error(errData.message || "Failed to submit idea.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600/50 dark:hover:border-blue-500/50 focus-within:border-blue-600 focus:outline-none transition-all duration-300 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 w-full rounded-2xl px-4 py-3";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-transparent py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Submit Your Idea</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Share your startup concept with the world and get valuable feedback.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-blue-900/10">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label htmlFor="IdeaTitle" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                    Idea Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="IdeaTitle"
                                    name="IdeaTitle"
                                    required
                                    placeholder="E.g., Next-gen AI Assistant"
                                    className={inputClasses}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="Category" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="Category"
                                    name="Category"
                                    required
                                    defaultValue=""
                                    className={inputClasses}
                                >
                                    <option value="" disabled>Select a category</option>
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="ShortDescription" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                Short Description <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="ShortDescription"
                                name="ShortDescription"
                                required
                                placeholder="A one-sentence summary of your idea"
                                className={inputClasses}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="DetailedDescription" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                Detailed Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="DetailedDescription"
                                name="DetailedDescription"
                                required
                                rows={5}
                                placeholder="Explain how your idea works in detail..."
                                className={`${inputClasses} resize-none`}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label htmlFor="Tags" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                    Tags
                                </label>
                                <input
                                    id="Tags"
                                    name="Tags"
                                    placeholder="Innovation, tech, startup (comma-separated)"
                                    className={inputClasses}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="ImageURL" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                    Image URL
                                </label>
                                <input
                                    id="ImageURL"
                                    name="ImageURL"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    className={inputClasses}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="EstimatedBudget" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                    Estimated Budget
                                </label>
                                <input
                                    id="EstimatedBudget"
                                    name="EstimatedBudget"
                                    placeholder="E.g., $10k - $50k"
                                    className={inputClasses}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="TargetAudience" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                    Target Audience
                                </label>
                                <input
                                    id="TargetAudience"
                                    name="TargetAudience"
                                    placeholder="Who is this for?"
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label htmlFor="ProblemStatement" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                    Problem Statement
                                </label>
                                <textarea
                                    id="ProblemStatement"
                                    name="ProblemStatement"
                                    rows={4}
                                    placeholder="What problem are you solving?"
                                    className={`${inputClasses} resize-none`}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="ProposedSolution" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                    Proposed Solution
                                </label>
                                <textarea
                                    id="ProposedSolution"
                                    name="ProposedSolution"
                                    rows={4}
                                    placeholder="How does your idea solve this problem?"
                                    className={`${inputClasses} resize-none`}
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button
                                color="primary"
                                type="submit"
                                isLoading={isSubmitting}
                                className="h-14 px-10 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group"
                            >
                                Submit Idea to Vault
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddIdeaPage;