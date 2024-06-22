import React, { useState } from 'react'

export default function NoteFrom() {
    //  declaring the use Sates
    const [NewNote, setNewNote] = useState({title:"",description:""});

    //  Handle on Inputs typing
    const handlechange=(e)=>{
        setNewNote({ ...NewNote, [e.target.id]: e.target.value });
        
    }

    // handle on the click
    const handleclick=(e)=>{
        console.log(NewNote);
        setNewNote({title:"",description:""});
        e.preventDefault();
    }

  return (
    <div className='container my-5'>
        <h1>Your Notes</h1>
        <form>
  <div className="mb-3">
    <div className='my-4'>

    <label htmlFor="exampleInputEmail1" className="form-label"><h5>Title</h5></label>
    <input type="input" onChange={handlechange} name='title' className="form-control" id="title" value={NewNote.title} placeholder="Add Your Title"/>
    </div>
   </div>
  <div className="mb-3 my-4">
    <label htmlFor="exampleInputPassword1"  className="form-label"><h5>Description</h5></label>
    <input type="input" onChange={handlechange} name='description' className="form-control" id="description" value={NewNote.description} placeholder="Add your Description" />
  </div>
  <div className="mb-3 my-3">
  <button type="submit" onClick={handleclick}className="btn btn-primary">Add Note</button>
  </div>
</form>
    </div>
  )
}
