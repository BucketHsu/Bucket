import React, { useState } from 'react';

export default function EntryModal({ isOpen, onSubmit, onClose }) {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason);
      setReason('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow w-96">
        <h2 className="text-lg mb-2">請輸入不爽理由</h2>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} className="w-full p-2 border" />
        <div className="text-right mt-2">
          <button onClick={onClose} className="mr-2">取消</button>
          <button onClick={handleSubmit}>送出</button>
        </div>
      </div>
    </div>
  );
}
