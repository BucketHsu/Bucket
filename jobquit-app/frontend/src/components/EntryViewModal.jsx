import React from 'react';

export default function EntryViewModal({ entry, onClose }) {
    if (!entry) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-4 rounded shadow w-11/12 max-w-md"
                onClick={(e) => e.stopPropagation()} // ⛔ 點到彈窗內不關閉
            >
                <h2 className="text-lg font-semibold mb-2">詳細內容</h2>
                <p className="mb-2 whitespace-pre-wrap">{entry.reason}</p>
                <p className="text-sm text-gray-500">
                    {new Date(entry.timestamp).toLocaleString()}
                </p>
                <div className="text-right mt-2">
                    <button
                        onClick={onClose}
                        className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        關閉
                    </button>
                </div>
            </div>
        </div>
    );
}