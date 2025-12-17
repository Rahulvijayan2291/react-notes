import "../styles/Sidebar.Module.css";

const Sidebar = ({
  setNoteBtnClick,
  noteGroups,
  setSelectedNote,
  selectedNote,
  isMobile,
  display,
  setDisplay,
}) => {
  const handleSelect = (note) => {
    if (isMobile) {
      setDisplay(true);
    }
    setSelectedNote(note);
  };

  return (
    <div
      className={`sidebar ${isMobile ? "mob-sidebar" : ""}`}
      style={{ display: isMobile && display ? "none" : "" }}
    >
      <div className="sidebar-heading">
        <p className="sidebar-title">Pocket Notes</p>
      </div>

      <div className="sidebar-notes-list flex justify-start">
        {noteGroups &&
          noteGroups.map((note, index) => {
            const names = note.name.split(" ");
            const firstLetters = names.map((word) => word.charAt(0)).join("");
            return (
              <div
                className={`sidebar-note-element flex flex-row justify-start ${
                  note.id === selectedNote?.id ? "note-selected" : ""
                }`}
                key={index}
                onClick={() => handleSelect(note)}
              >
                <div
                  className="circle note-list-icon flex"
                  style={{ backgroundColor: note.color }}
                >
                  {firstLetters.substring(0, 2).toUpperCase()}
                </div>
                <p className="sidebar-note-title">{note.name}</p>
              </div>
            );
          })}
      </div>

      {/* FIXED CREATE BUTTON AREA */}
      <div className="add-btn-container">
        <button 
          className="add-btn-circle flex" 
          onClick={() => setNoteBtnClick(true)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Sidebar;