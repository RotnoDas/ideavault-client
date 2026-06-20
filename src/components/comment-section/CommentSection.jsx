'use client';
import React, { useState } from 'react';
import { Button, Avatar } from '@heroui/react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const CommentSection = ({ ideaId, initialComments = [], apiBaseUrl, token }) => {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

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
                setComments([...comments, { comment: newComment, user: session.user.username || session.user.name || "Anonymous" }]);
                setNewComment('');
                router.refresh();
            } else {
                console.error("Failed to post comment");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-12 pt-8 border-t border-slate-100">
            <h3 className="text-2xl font-black text-slate-900 mb-8">Comments</h3>
            <div className="space-y-6 mb-10">
                {comments && comments.length > 0 ? (
                    comments.map((c, index) => (
                        <div key={index} className="flex gap-4 p-5 bg-white rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                            <Avatar name={c.user || 'U'} className="shrink-0 bg-blue-100 text-blue-600 font-bold" />
                            <div>
                                <h4 className="font-bold text-slate-900">{c.user || 'Unknown User'}</h4>
                                <p className="text-slate-600 mt-2 leading-relaxed">{c.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-500 italic">No comments yet. Be the first to share your thoughts!</p>
                    </div>
                )}
            </div>
            {session ? (
                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-indigo-500"></div>
                    <div className="flex items-center gap-3 mb-6">
                        <Avatar name={session.user.name || 'U'} size="sm" />
                        <h4 className="font-bold text-slate-900">Leave a comment as {session.user.name}</h4>
                    </div>
                    <textarea 
                        placeholder="What are your thoughts on this idea? Share your perspective..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-slate-50 focus:bg-white transition-colors border border-slate-200 rounded-xl p-4 mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                <div className="bg-slate-50 p-8 rounded-[2.5rem] text-center border border-slate-100">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Join the conversation</h4>
                    <p className="text-slate-600">Please log in to leave a comment.</p>
                </div>
            )}
        </div>
    );
};

export default CommentSection;
