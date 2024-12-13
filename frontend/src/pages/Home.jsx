import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import NoteCard from "../components/NoteCard";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(response.data.notes);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModel = () => {
    setModelOpen(false);
    setCurrentNote(null);
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
        toast.success("Note Added successfully", {
          autoClose: 2000,
        });
        fetchNotes();
        closeModel();
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.msg || "Logged In to create a notes",
          {
            autoClose: 2000,
          }
        );
      } else {
        toast.error("An unknown error occurred.", {
          autoClose: 2000,
        });
      }
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
        toast.success("Note deleted successfully", {
          autoClose: 2000,
        });
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
        toast.success("Note updated successfully", {
          autoClose: 2000,
        });
        fetchNotes();
        closeModel();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />

      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
        {notes.length === 0 ? (
          <p></p>
        ) : filteredNotes.length === 0 ? (
          <p className=" text-gray-600 text-lg font-semibold">
            No notes match your search.{" "}
          </p>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
            />
          ))
        )}
      </div>

      <button
        className="text-2xl w-16 h-16 flex items-center justify-center rounded-2xl bg-primary bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setCurrentNote(null);
          setModelOpen(true);
        }}
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
