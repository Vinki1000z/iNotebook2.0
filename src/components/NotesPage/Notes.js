import React, { useEffect } from 'react'
import NoteFrom from './NoteFrom'
import ShowNotes from './ShowNotes'
import {useNavigate} from "react-router-dom"

export default function Notes() {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
    /* eslint-disable */
  }, [])
  
  return (
    <>
    <NoteFrom/>
    {/* show note contain the funcationality of the delete and the edit note */}
    <ShowNotes/>
    </>
  )
}
