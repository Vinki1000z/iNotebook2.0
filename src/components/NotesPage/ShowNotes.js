import React, { useContext, useEffect } from "react";
import NotesContext from "../../createcontext/Notes/NotesContext";

export default function ShowNotes() {
  const { Notes, DeleteNote } = useContext(NotesContext);
  // useEffect(() => {
  //   console.log(Notes);
  // }, [])
  const handleondelete = (e,id) => {
    DeleteNote(id);
    e.preventDefault();
  };
  return (
      <div className="container">
        <h3 className="my-4">Your Notes</h3>
        <div className="row">
          {Notes.map((Note) => {
            return (
                <div className="col-sm-4 mb-3 mb-sm-0 my-3" key={Note._id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{Note.title}</h5>
                      <p className="card-text">{Note.description}</p>
                      <a
                        href="/"
                        onClick={(e)=>handleondelete(e,Note._id)}
                        className="btn btn-primary mx-3"
                      >
                        Delete
                      </a>
                      <a href="/" className="btn btn-primary">
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
  
            );
          })}
        </div>
      </div>
  );
}
