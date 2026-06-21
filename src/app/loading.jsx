import React from 'react';

const Loading = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-transparent">
            <div className="flex flex-col items-center gap-4">

                {/* Spinner */}
                <div className="h-12 w-12 border-4 border-slate-200 dark:border-slate-800 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>

                {/* Loading text */}
                <p className="text-slate-600 dark:text-slate-400 text-sm tracking-wide">
                    Loading, please wait...
                </p>

            </div>
        </div>
    );
};

export default Loading;