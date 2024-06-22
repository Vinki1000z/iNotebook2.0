import React, { useState} from "react";
import NoteContext from "./NotesContext";
export default function NoteState(props) {
    const tempnotes=[
        {
          "_id": "667518561970fb5c4815d498",
          "description": "hosfavebbbbbbbbbbbs",
          "title": "to do 2324in homekjbikjd  ",
          "user": "66750c6acb68a98125751089",
          "date": "2024-06-21T06:06:14.617Z",
          "__v": 0
        }
      ]
    const [Notes, setNotes] = useState(tempnotes);
    const AllNotes=()=>{

    }
    const AddNote=()=>{

    }
    const DeleteNote=(id)=>{
    }
    
    const UpdateNote=()=>{

    }
  return (
    <>
      <NoteContext.Provider value={{Notes,DeleteNote}}>{props.children}</NoteContext.Provider>
    </>
  );
}
