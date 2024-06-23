import React, { useContext, useState } from "react";
import NotesContext from "../../createcontext/Notes/NotesContext";
// import "./EditNote.css"
export default function EditNote(props) {
  const { UpdateNote } = useContext(NotesContext);
  const [NewNote, setNewNote] = useState();
  const [showModal, setShowModal] = useState(false);

  const handleOnEdit = (e, Note) => {
    e.preventDefault();
    setNewNote(Note);
    props.toggleDisable();
    setShowModal(true);
  };
  //  Handle on Inputs typing
  const handlechange = (e) => {
    setNewNote({ ...NewNote, [e.target.id]: e.target.value });
  };

  const handleCloseModal = () => {
    props.toggleDisable();
    setShowModal(false);
  };
  const handleonsave = () => {
    UpdateNote(NewNote);
    props.toggleDisable();
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={(e) => handleOnEdit(e, props.TempNote)}
        type="button"
        className={`btn btn-primary mx-3 ${
          props.buttonDisabled ? "disabled" : ""
        }`}
      >
        Edit
      </button>

      {showModal && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <span
              className="close"
              onClick={handleCloseModal}
              style={{ cursor: "pointer", margin: "4px" }}
            >
              &times;
            </span>

            <div className="modal-body">
              <div className="card" style={{ width: "24rem" }}>
                <div className="card-body">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <h5>Edit Title</h5>
                  </label>
                  <input
                    type="input"
                    onChange={handlechange}
                    name="title"
                    className="form-control"
                    id="title"
                    value={NewNote.title}
                    placeholder="Add Your Title"
                  />
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label my-3"
                  >
                    <h5>Edit Description</h5>
                  </label>
                  <input
                    type="input"
                    onChange={handlechange}
                    name="description"
                    className="form-control"
                    id="description"
                    value={NewNote.description}
                    placeholder="Add your Description"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary my-3 "
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="btn btn-primary my-3 mx-3"
                onClick={handleonsave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
