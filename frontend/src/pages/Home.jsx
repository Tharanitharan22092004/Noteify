import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import NoteCard from "../components/NoteCard";
import axios from "axios";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [filteredNotes,setFilteredNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
      setFilteredNotes(
        notes.filter((note) => 
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
    )
  );

  },[query,notes])

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/note");
      setNotes(response.data.notes);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModelOpen(true);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModel();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModel();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery}/>

      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredNotes.length>0?filteredNotes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={onEdit}
            deleteNote={deleteNote}
          />
        )):<p>No Notes Found</p>}
      </div>

      <button
        className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full"
        onClick={() => setModelOpen(true)}
      >
        +
      </button>

      {isModelOpen && (
        <NoteModel
          closeModel={closeModel}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
