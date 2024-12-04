import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoteModel = ({ closeModel, addNote }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        addNote(title, description);
        
      };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 rounded">
                <h2 className="text-xl font-bold mb-4">Add New Note</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-4 w-full p-2 border rounded"
                        placeholder="Note Title"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mb-4 w-full p-2 border rounded"
                        placeholder="Note Description"
                    />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 px-4 py-2 rounded text-white"
                        >
                            Add Note
                        </button>
                        <button
                            type="button"
                            className="ml-4 bg-gray-400 px-4 py-2 rounded text-white"
                            onClick={closeModel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteModel;
