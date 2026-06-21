'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search as SearchIcon } from 'lucide-react';
import { Input, Button } from '@heroui/react';

const SearchBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const initialSearch = searchParams.get('search') || '';
        setSearchQuery(initialSearch);
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (searchQuery.trim()) {
            params.set('search', searchQuery);
        } else {
            params.delete('search');
        }
        router.push(`/ideas?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex w-full gap-2 relative shadow-sm border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 p-2 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent transition-all">
            <div className="flex-1 flex items-center pl-3">
                <SearchIcon className="text-slate-400 dark:text-slate-500 w-5 h-5 mr-3" />
                <input
                    type="text"
                    placeholder="Search for ideas by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-full bg-transparent border-0 outline-none focus:ring-0 focus:outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-lg py-1"
                />
            </div>
            <Button 
                type="submit" 
                color="primary" 
                className="px-8 font-bold rounded-xl shadow-md shadow-blue-600/20"
            >
                Search
            </Button>
        </form>
    );
};

export default SearchBar;
