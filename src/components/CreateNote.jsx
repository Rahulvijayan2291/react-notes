import { useState } from "react";
import "../styles/CreateNote.Module.css";

const colorOptions = [
  { color: "#B38BFA" },
  { color: "#FF79F2" },
  { color: "#43E6FC" },
  { color: "#F19576" },
  { color: "#0047FF" },
  { color: "#6691FF" },
];

const CreateNote = ({ noteBtnClick, noteGroups, setNoteBtnClick, setNoteGroups }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleCreateGroup = () => {
    if (!groupName.trim() || !selectedColor) return;

    const newGroup = {
      id: Date.now(),
      name: groupName,
      color: selectedColor,
      notes: [],
    };

    const updatedGroups = [...noteGroups, newGroup];
    localStorage.setItem("noteGroups", JSON.stringify(updatedGroups));
    setNoteGroups(updatedGroups);
    
    // Reset and Close
    setGroupName("");
    setSelectedColor("");
    setNoteBtnClick(false);
  };

  if (!noteBtnClick) return null;

  return (
    <div className="modal-overlay" onClick={() => setNoteBtnClick(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Create New group</h2>
        
        <div className="input-row">
          <label className="modal-label">Group Name</label>
          <input
            type="text"
            className="modal-input"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className="input-row">
          <label className="modal-label">Choose colour</label>
          <div className="color-palette">
            {colorOptions.map((opt) => (
              <div
                key={opt.color}
                className={`color-circle ${selectedColor === opt.color ? "active" : ""}`}
                style={{ backgroundColor: opt.color }}
                onClick={() => setSelectedColor(opt.color)}
              />
            ))}
          </div>
        </div>

        <div className="button-container">
          <button className="modal-create-btn" onClick={handleCreateGroup}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;