import React from 'react';

const Tags = ({tag}) => {
    return (
        <div className="flex items-center gap-3 bg-slate-100 px-6 py-3 rounded-2xl border border-slate-200 text-slate-900 font-bold hover:bg-white hover:shadow-lg transition-all duration-300">
            <span className='text-slate-900'>{tag}</span>
        </div>
    );
};

export default Tags;