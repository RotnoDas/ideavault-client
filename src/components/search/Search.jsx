import React from 'react';
import SearchBar from "./SearchBar";
const Search = () => {
    return (
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
                    Discover{' '}
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">Innovative</span>{' '}
                    Ideas
                </h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    Explore groundbreaking projects, validate your next big concept, and connect with visionary creators.
                </p>

                <div className="max-w-2xl mx-auto pt-4">
                    <SearchBar />
                </div>
            </div>
        </header>
    );
};

export default Search;