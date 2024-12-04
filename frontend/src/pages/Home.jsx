import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);

  const closeModel = () => {
    setModelOpen(false);
  };

  const addNote = async (title,description) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description },
        { headers: { "Content-Type": "application/json" } }
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
