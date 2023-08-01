import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote } = context; // Took deleteNote from context
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">Category: {note.tag}</h5>
                    <h4 className="card-title">{note.title}</h4>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Your Note Deleted Successfully", "success"); }}></i>
                    <i className="fa-solid fa-pen-to-square" onClick={()=> {updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
