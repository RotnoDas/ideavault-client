import React from 'react';
import SearchBar from "./SearchBar";
const Search = () => {
    return (
        <header className="bg-white border-b border-slate-200 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                    Discover{' '}
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-800">Innovative</span>{' '}
                    Ideas
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto">
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