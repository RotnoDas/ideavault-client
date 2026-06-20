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
            const response = await fetch(`${process.env.NEXT_PUBLIC_ALL_API || 'http://localhost:8000'}/ideas/${idea._id}`, {
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
            <div className="flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl relative">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                    {idea.ImageURL ? (
                        <Image src={idea.ImageURL} alt={idea.IdeaTitle || "Idea image"} className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"></Image>
                    ) : (
                        <div className="text-slate-400 text-sm">No Image</div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Link href={`/edit-idea/${idea._id}`}>
                            <Button size="sm" variant="flat" className="bg-white/90 backdrop-blur-sm shadow-sm font-medium border border-slate-200">
                                Edit
                            </Button>
                        </Link>
                        
                        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
                            <Button size="sm" color="danger" className="shadow-sm font-medium">
                                Delete
                            </Button>
                            <AlertDialog.Backdrop>
                                <AlertDialog.Container>
                                    <AlertDialog.Dialog className="sm:max-w-[400px]">
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
                                            <Button color="danger" isLoading={isDeleting} onPress={() => handleDelete(() => setIsOpen(false))}>
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
                        <Chip color="primary" variant="flat" size="sm" className="font-bold mb-3 text-[10px] uppercase tracking-widest text-blue-600 bg-blue-50">
                            {idea.Category || 'Idea'}
                        </Chip>
                        <h3 className="text-xl font-bold leading-tight line-clamp-2 text-slate-900">
                            {idea.IdeaTitle}
                        </h3>
                        <p className="text-sm text-slate-500 mt-2 font-medium line-clamp-2">
                            {idea.ShortDescription}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-auto pt-4">
                        <Avatar name={idea.Author || 'U'} size="sm" className="w-6 h-6 text-[10px]" />
                        <span className="text-xs font-bold text-slate-500">{idea.Author || 'Unknown'}</span>
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
