'use client';
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Loading from '@/app/loading';

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

const EditIdeaPage = () => {
    const router = useRouter();
    const params = useParams();
    const ideaId = params.id;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [idea, setIdea] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const { data: tokenObj } = await authClient.token();
                const response = await fetch(`http://localhost:8000/ideas/${ideaId}`, {
                    headers: {
                        'Authorization': `Bearer ${tokenObj?.token || ''}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setIdea(data);
                } else {
                    toast.error("Failed to load idea data");
                }
            } catch (error) {
                toast.error("An error occurred loading the idea");
            } finally {
                setIsLoading(false);
            }
        };
        if (ideaId) {
            fetchIdea();
        }
    }, [ideaId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const updatedIdea = Object.fromEntries(formData.entries());

        if (typeof updatedIdea.Tags === 'string') {
            updatedIdea.Tags = updatedIdea.Tags.split(',').map(tag => tag.trim()).filter(Boolean);
        } else if (!updatedIdea.Tags) {
            updatedIdea.Tags = [];
        }

        if (!updatedIdea.IdeaTitle || !updatedIdea.Category || !updatedIdea.ShortDescription || !updatedIdea.DetailedDescription) {
            toast.error("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }

        try {
            const { data: session } = await authClient.getSession();
            if (!session) {
                toast.error("You must be logged in to edit an idea.");
                router.push("/login");
                return;
            }

            const { data: tokenObj } = await authClient.token();
            
            const response = await fetch(`http://localhost:8000/ideas/${ideaId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenObj?.token || ''}`
                },
                body: JSON.stringify(updatedIdea)
            });

            if (response.ok) {
                toast.success("Idea updated successfully!");
                router.push("/my-idea");
            } else {
                const errData = await response.json();
                toast.error(errData.message || "Failed to update idea.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600/50 dark:hover:border-blue-500/50 focus-within:border-blue-600 focus:outline-none transition-all duration-300 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 w-full rounded-2xl px-4 py-3";

    if (isLoading) {
        return <Loading />;
    }

    if (!idea) {
        return <div className="min-h-screen bg-slate-50 dark:bg-transparent flex items-center justify-center font-bold text-slate-500 dark:text-slate-400">Idea not found.</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-transparent py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Edit Idea</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Update the details of your startup concept.</p>
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
                                    defaultValue={idea.IdeaTitle}
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
                                    defaultValue={idea.Category || ""}
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
                                defaultValue={idea.ShortDescription}
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
                                defaultValue={idea.DetailedDescription}
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
                                    defaultValue={Array.isArray(idea.Tags) ? idea.Tags.join(", ") : idea.Tags}
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
                                    defaultValue={idea.ImageURL}
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
                                    defaultValue={idea.EstimatedBudget}
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
                                    defaultValue={idea.TargetAudience}
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
                                    defaultValue={idea.ProblemStatement}
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
                                    defaultValue={idea.ProposedSolution}
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
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditIdeaPage;
