'use client';

import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MyProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '');
            setImage(session.user.image || '');
        }
    }, [session]);

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push('/login');
        }
    }, [isPending, session, router]);

    if (isPending || !session?.user) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const { data, error } = await authClient.updateUser({
                name: name,
                image: image
            });
            if (error) {
                setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
            } else {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                router.refresh(); 
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    };

    // Extract first name for the welcome message
    const firstName = session.user.name ? session.user.name.split(' ')[0] : 'User';

    // Get initials for avatar fallback
    const getInitials = (fullName) => {
        if (!fullName) return 'U';
        return fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome, {firstName}!</h1>
                    <p className="text-slate-500 mt-2">Manage your profile information and account settings.</p>
                </div>

                <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 sm:p-10">
                    <div className="flex items-center gap-3 mb-10">
                        <UserIcon className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-bold text-slate-900">Profile Details</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10 pb-10 border-b border-slate-100">
                        {image || session.user.image ? (
                            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-slate-100 ring-4 ring-slate-50 shrink-0">
                                <Image
                                    src={image || session.user.image}
                                    alt="Profile avatar"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-slate-200 text-slate-600 text-3xl font-bold ring-4 ring-slate-50 shrink-0">
                                {getInitials(name || session.user.name)}
                            </div>
                        )}
                        <div>
                            <h3 className="font-bold text-slate-900 mb-1">Profile Photo</h3>
                            <p className="text-sm text-slate-500">Provide an image URL in the form below to change your avatar.</p>
                        </div>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-3xl">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-bold text-slate-700">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="image" className="block text-sm font-bold text-slate-700">
                                Image URL
                            </label>
                            <input
                                id="image"
                                type="url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900"
                                placeholder="https://example.com/avatar.jpg"
                            />
                        </div>

                        <div className="space-y-2 pt-2">
                            <label htmlFor="email" className="block text-sm font-bold text-slate-700">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={session.user.email}
                                disabled
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none cursor-not-allowed"
                            />
                            <p className="text-xs text-slate-400 mt-2">Email cannot be changed directly.</p>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="pt-6">
                            <Button
                                type="submit"
                                color="primary"
                                isLoading={loading}
                                className="px-8 font-bold rounded-xl shadow-md shadow-blue-600/20"
                                size="lg"
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

export default MyProfilePage;