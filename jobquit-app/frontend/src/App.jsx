import React, {useEffect, useState} from 'react';
import Grid from './components/Grid';
import EntryModal from './components/EntryModal';
import EntryViewModal from './components/EntryViewModal';
import {getEntries, postEntry} from './api/emotionApi';

export default function App() {
    const [entries, setEntries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showView, setShowView] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedEntry, setSelectedEntry] = useState(null);

    useEffect(() => {
        fetch('/api/init', {credentials: 'include'});
        loadEntries();
    }, []);

    const loadEntries = async () => {
        const data = await getEntries();
        setEntries(data);
    };

    const handleEmptyClick = () => setShowModal(true);
    const handleFilledClick = (i, entry) => {
        setSelectedIndex(i);
        setSelectedEntry(entry);
        setShowView(true);
    };

    const handleSubmit = async (reason) => {
        await postEntry(reason);
        setShowModal(false);
        loadEntries();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-center mb-6">集滿 100 次就離職</h1>
                <Grid entries={entries} onEmptyClick={handleEmptyClick} onFilledClick={handleFilledClick}/>
                <EntryModal isOpen={showModal} onSubmit={handleSubmit} onClose={() => setShowModal(false)}/>
                <EntryViewModal
                    entry={selectedEntry}
                    onClose={() => {
                        setSelectedEntry(null);
                        setShowView(false);
                    }}
                />
            </div>
        </div>
    );
}
