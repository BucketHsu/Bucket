import React from 'react';

export default function Grid({entries, onEmptyClick, onFilledClick}) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
            {[...Array(100)].map((_, i) => {
                const entry = entries[i];
                return (
                    <div
                        key={i}
                        className={`w-20 h-20 flex items-center justify-center text-lg font-semibold border rounded-full cursor-pointer transition
          ${entry ? 'bg-red-400 hover:bg-red-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                        onClick={() => entry ? onFilledClick(i, entry) : onEmptyClick(i)}
                        title={entry ? entry.reason : '點我填寫'}
                    >
                        {entry ? i + 1 : '+'}
                    </div>
                );
            })}
        </div>

    );
}