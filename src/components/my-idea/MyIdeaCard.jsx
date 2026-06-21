'use client';
import { Avatar, Button, Chip, AlertDialog } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const MyIdeaCard = ({ idea, token }) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async (onClose) => {
        setIsDeleting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ALL_API || process.env.PUBLIC_ALL_API || "http://localhost:8000"}/ideas/${idea._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                toast.success("Idea deleted successfully!");
                onClose();
                router.refresh();
            } else {
                toast.error("Failed to delete idea.");
            }
        } catch (error) {
            toast.error("An error occurred.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/20 relative">
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {idea.ImageURL ? (
                        <Image src={idea.ImageURL} alt={idea.IdeaTitle || "Idea image"} className="object-cover" fill loading="lazy" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"></Image>
                    ) : (
                        <div className="text-slate-400 dark:text-slate-500 text-sm">No Image</div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Link href={`/edit-idea/${idea._id}`}>
                            <Button size="sm" variant="flat" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-sm font-medium border border-slate-200 dark:border-slate-700 dark:text-white">
                                Edit
                            </Button>
                        </Link>
                        
                        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white shadow-sm font-medium backdrop-blur-sm border-none">
                                Delete
                            </Button>
                            <AlertDialog.Backdrop>
                                <AlertDialog.Container>
                                    <AlertDialog.Dialog className="sm:max-w-100">
                                        <AlertDialog.CloseTrigger />
                                        <AlertDialog.Header>
                                            <AlertDialog.Icon status="danger" />
                                            <AlertDialog.Heading>Confirm Deletion</AlertDialog.Heading>
                                        </AlertDialog.Header>
                                        <AlertDialog.Body>
                                            <p>
                                                Are you sure you want to delete the idea <strong>{idea.IdeaTitle}</strong>? This action cannot be undone.
                                            </p>
                                        </AlertDialog.Body>
                                        <AlertDialog.Footer>
                                            <Button variant="light" onPress={() => setIsOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button isLoading={isDeleting} onPress={() => handleDelete(() => setIsOpen(false))} className="bg-red-600 hover:bg-red-700 text-white font-bold">
                                                Delete Idea
                                            </Button>
                                        </AlertDialog.Footer>
                                    </AlertDialog.Dialog>
                                </AlertDialog.Container>
                            </AlertDialog.Backdrop>
                        </AlertDialog>
                    </div>
                </div>
                <div className="p-6 flex flex-col grow space-y-4">
                    <div>
                        <Chip color="primary" variant="flat" size="sm" className="font-bold mb-3 text-[10px] uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800">
                            {idea.Category || 'Idea'}
                        </Chip>
                        <h3 className="text-xl font-bold leading-tight line-clamp-2 text-slate-900 dark:text-slate-100">
                            {idea.IdeaTitle}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium line-clamp-2">
                            {idea.ShortDescription}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                        <Avatar name={idea.Author || 'U'} size="sm" className="w-6 h-6 text-[10px]" />
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{idea.Author || 'Unknown'}</span>
                    </div>

                    <Link href={`/ideas/${idea._id}`} className="block w-full mt-4">
                        <Button color="primary" className="w-full font-bold shadow-lg shadow-blue-600/20">
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default MyIdeaCard;
