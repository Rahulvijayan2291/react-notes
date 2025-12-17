import React from "react";
import "../styles/NoteView.Module.css";
import Input from "./Input";
import NoteHeader from "./NoteHeader";

const NoteView = ({ name, color, id, isMobile, display, setDisplay }) => {
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    const noteGroups = JSON.parse(localStorage.getItem("noteGroups")) || [];
    const group = noteGroups.find((g) => g.id === id);
    if (group) setNotes(group.notes);
  }, [id]);

  const handleNewNote = (value) => {
    setNotes((prev) => [...prev, value]);
  };

  return (
    <div className="note-view-container" style={{ display: isMobile && !display ? "none" : "flex" }}>
      <NoteHeader name={name} color={color} isMobile={isMobile} setDisplay={setDisplay} />
      <div className="notes-display-area">
        {notes.map((note, index) => (
          <div className="note-card" key={index}>
            <p className="note-text">{note.content}</p>
            <div className="note-timestamp">
              {note.date} <span className="dot">•</span> {note.time}
            </div>
          </div>
        ))}
      </div>
      <Input id={id} handleNewNote={handleNewNote} />
    </div>
  );
};

export default NoteView;