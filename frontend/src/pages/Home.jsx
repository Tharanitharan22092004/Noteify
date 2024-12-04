import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import axios from 'axios';
const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/note");
        setNotes(response.data.notes);
      } catch (error) {
        console.error(error);
      }
    }
    fetchNotes();
  },[]);
  const closeModel = () => {
    setModelOpen(false);
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
        closeModel();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div>
        {notes.map(note =>{
          <NoteCard
          note={note}
          />
        })}:
      </div>
      <button
        className="fixed right-4 bottom-4 text=2xl bg-teal-500 text-white font-bold p-4 rounded-full"
        onClick={() => setModelOpen(true)}
      >
        +
      </button>

      {isModelOpen && <NoteModel closeModel={closeModel} addNote={addNote} />}
    </div>
  );
};

export default Home;
