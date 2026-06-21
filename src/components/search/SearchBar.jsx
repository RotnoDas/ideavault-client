'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search as SearchIcon } from 'lucide-react';
import { Input, Button } from '@heroui/react';

const CATEGORIES = [
    "All Categories", "Health", "Education", "Tech", "AI", 
    "Software", "Lifestyle", "Finance", "Gaming", "E-commerce", "Community", "Other"
];

const SearchBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All Categories');

    useEffect(() => {
        const initialSearch = searchParams.get('search') || '';
        setSearchQuery(initialSearch);
        const initialCategory = searchParams.get('category') || 'All Categories';
        setCategory(initialCategory);
    }, [searchParams]);

    const handleSearch = (e) => {
        if(e) e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (searchQuery.trim()) {
            params.set('search', searchQuery);
        } else {
            params.delete('search');
        }
        
        if (category && category !== 'All Categories') {
            params.set('category', category);
        } else {
            params.delete('category');
        }
        
        router.push(`/ideas?${params.toString()}`);
    };

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setCategory(newCategory);
        
        const params = new URLSearchParams(searchParams);
        if (searchQuery.trim()) params.set('search', searchQuery);
        else params.delete('search');
        
        if (newCategory !== 'All Categories') params.set('category', newCategory);
        else params.delete('category');
        
        router.push(`/ideas?${params.toString()}`);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2 relative shadow-sm border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 p-2 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent transition-all">
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
            <div className="sm:w-56 shrink-0 relative">
                <select 
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-full h-full min-h-[56px] px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-100 shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
                >
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
