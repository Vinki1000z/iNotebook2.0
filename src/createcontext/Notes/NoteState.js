import React, { useState } from "react";
import NoteContext from "./NotesContext";
const network = "http://localhost:5000";
export default function NoteState(props) {
  const [Notes, setNotes] = useState();

  // showing all note
  const AllNotes = async () => {
    const response = await fetch(`${network}/api/notes/getallnote`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    setNotes(data);
  };

  // addnote
  const AddNote = async ({ title, description }) => {
    const data = {
      title,
      description,
    };
    const response = await fetch(`${network}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json.msg);
    setNotes(Notes.concat(data));
  };

  // deleting
  const DeleteNote = async (id) => {
    const response = await fetch(`${network}/api/notes/delete/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json.msg);
    const newnotes = Notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };

  // updating

  const UpdateNote = async (Note) => {
    const data = {
      title: Note.title,
      description: Note.description,
    };
    const response = await fetch(`${network}/api/notes/update/${Note._id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json.msg);
    let newnote = JSON.parse(JSON.stringify(Notes));
    for (let index = 0; index < newnote.length; index++) {
      const element = newnote[index];
      if (element._id === Note._id) {
        newnote[index].title = Note.title;
        newnote[index].description = Note.description;
      }
      break;
    }
    setNotes(newnote);
  };

  return (
    <>
      <NoteContext.Provider
        value={{ Notes, DeleteNote, AddNote, UpdateNote, AllNotes }}
      >
        {props.children}
      </NoteContext.Provider>
    </>
  );
}
