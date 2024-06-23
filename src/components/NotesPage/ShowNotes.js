import React, { useContext, useEffect, useState } from "react";
import NotesContext from "../../createcontext/Notes/NotesContext";
import EditNote from "./EditNote";

export default function ShowNotes() {
  const { Notes, DeleteNote, AllNotes } = useContext(NotesContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    AllNotes();
    // eslint-disable-next-line
  }, [Notes]);

  const handleOnDelete = (e, id) => {
    e.preventDefault();
    DeleteNote(id);
  };

  const toggleDisable = () => {
    setButtonDisabled(!buttonDisabled);
  };

  return (
    <>
      <div className="container">
        <h3 className="my-4">Your Notes</h3>
        <div className="row">
          {Notes && Notes.map((Note) => (
            <div className="col-sm-4 mb-3 mb-sm-0 my-3" key={Note._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{Note.title}</h5>
                  <p className="card-text">{Note.description}</p>
                  <button
                    onClick={(e) => handleOnDelete(e, Note._id)}
                    className={`btn btn-primary mx-3 ${buttonDisabled ? 'disabled' : ''}`}
                  >
                    Delete
                  </button>
                  <EditNote TempNote={Note} toggleDisable={toggleDisable} buttonDisabled={buttonDisabled} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
