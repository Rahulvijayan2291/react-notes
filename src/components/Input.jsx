import { useState } from "react";
import "../styles/Input.Module.css";

const Input = ({ id, handleNewNote }) => {
  const [note, setNote] = useState("");

  const handleSendClick = () => {
    if (!note.trim()) return;

    const now = new Date();
    const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-GB', dateOptions);
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = now.toLocaleTimeString('en-US', timeOptions);

    const newNote = {
      date: formattedDate,
      time: formattedTime,
      content: note,
      id: Math.floor(Math.random() * 1000),
    };

    handleNewNote(newNote);
    const notesGroup = JSON.parse(localStorage.getItem("noteGroups")) || [];
    const groupIndex = notesGroup.findIndex((group) => group.id === id);
    if (groupIndex !== -1) {
      notesGroup[groupIndex].notes.push(newNote);
      localStorage.setItem("noteGroups", JSON.stringify(notesGroup));
    }
    setNote("");
  };

  return (
    <div className="input-container">
      <div className="input-div">
        <textarea
          className="note-input"
          placeholder="Enter your text here..........."
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendClick()}
          value={note}
          rows="4"
        />
        <svg
          className="send-btn"
          width="35"
          height="29"
          viewBox="0 0 35 29"
          fill="none"
          onClick={handleSendClick}
          style={{ opacity: note.trim() ? 1 : 0.5 }}
        >
          <path d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z" fill={note.trim() ? "#001F8B" : "#ABABAB"} />
        </svg>
      </div>
    </div>
  );
};

export default Input;