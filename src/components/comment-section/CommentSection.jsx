'use client';
import React, { useState, useEffect } from 'react';
import { Button, Avatar } from '@heroui/react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const CommentSection = ({ ideaId, initialComments = [], apiBaseUrl, token }) => {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [isEditingSubmitting, setIsEditingSubmitting] = useState(false);

    const { data: session } = useSession();
    const router = useRouter();

    const currentUserName = session?.user?.name || session?.user?.username;

    // Keep local state in sync when router.refresh() provides new data
    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !session) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`${apiBaseUrl}/ideas/${ideaId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ comment: newComment })
            });

            if (response.ok) {
                toast.success('Comment posted!');
                setNewComment('');
                router.refresh();
            } else {
                toast.error("Failed to post comment");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
            toast.error("An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (commentId) => {
        
        try {
            const response = await fetch(`${apiBaseUrl}/ideas/${ideaId}/comment/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                toast.success("Comment deleted!");
                setComments(comments.filter(c => c.id !== commentId));
                router.refresh();
            } else {
                toast.error("Failed to delete comment");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const handleEditStart = (comment) => {
        setEditingCommentId(comment.id);
        setEditContent(comment.comment);
    };

    const handleEditCancel = () => {
        setEditingCommentId(null);
        setEditContent('');
    };

    const handleEditSubmit = async (commentId) => {
        if (!editContent.trim()) return;
        
        setIsEditingSubmitting(true);
        try {
            const response = await fetch(`${apiBaseUrl}/ideas/${ideaId}/comment/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ comment: editContent })
            });

            if (response.ok) {
                toast.success("Comment updated!");
                setComments(comments.map(c => c.id === commentId ? { ...c, comment: editContent } : c));
                setEditingCommentId(null);
                router.refresh();
            } else {
                toast.error("Failed to update comment");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsEditingSubmitting(false);
        }
    };

    return (
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Comments</h3>
            <div className="space-y-6 mb-10">
                {comments && comments.length > 0 ? (
                    comments.map((c, index) => {
                        const isOwner = c.user === currentUserName;
                        const isEditing = editingCommentId === c.id;
                        
                        return (
                            <div key={c.id || index} className="flex gap-4 p-5 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md dark:hover:shadow-blue-900/10">
                                <Avatar name={c.user || 'U'} className="shrink-0 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold" />
                                <div className="w-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-slate-900 dark:text-slate-100">{c.user || 'Unknown User'}</h4>
                                        
                                        {/* Show Edit/Delete only if the user is the owner and the comment has an ID (new comments) */}
                                        {isOwner && c.id && !isEditing && (
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => handleEditStart(c)}
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit comment"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(c.id)}
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete comment"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {isEditing ? (
                                        <div className="mt-2 space-y-3">
                                            <textarea 
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                                rows={3}
                                            />
                                            <div className="flex justify-end gap-2">
                                                <Button 
                                                    size="sm" 
                                                    variant="flat" 
                                                    color="default"
                                                    onClick={handleEditCancel}
                                                    isDisabled={isEditingSubmitting}
                                                >
                                                    <X className="w-4 h-4 mr-1" /> Cancel
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    color="primary"
                                                    onClick={() => handleEditSubmit(c.id)}
                                                    isLoading={isEditingSubmitting}
                                                    isDisabled={!editContent.trim() || editContent === c.comment}
                                                >
                                                    <Check className="w-4 h-4 mr-1" /> Save
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{c.comment}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                        <p className="text-slate-500 dark:text-slate-400 italic">No comments yet. Be the first to share your thoughts!</p>
                    </div>
                )}
            </div>
            {session ? (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-blue-900/10 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-indigo-500"></div>
                    <div className="flex items-center gap-3 mb-6">
                        <Avatar name={session.user.name || 'U'} size="sm" className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-bold text-slate-900 dark:text-slate-100">Leave a comment as {session.user.name}</h4>
                    </div>
                    <textarea 
                        placeholder="What are your thoughts on this idea? Share your perspective..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        rows={4}
                    />
                    <div className="flex justify-end">
                        <Button 
                            color="primary" 
                            type="submit" 
                            isLoading={isSubmitting}
                            isDisabled={!newComment.trim()}
                            className="font-bold px-8 rounded-full shadow-lg shadow-blue-500/30"
                        >
                            Post Comment
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] text-center border border-slate-100 dark:border-slate-800">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Join the conversation</h4>
                    <p className="text-slate-600 dark:text-slate-400">Please log in to leave a comment.</p>
                </div>
            )}
        </div>
    );
};

export default CommentSection;
