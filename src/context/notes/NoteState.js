import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
    // {
    //   "_id": "64ab873f7ce39567af8e0b21",
    //   "user": "64a871678f32b7cc4059cede",
    //   "title": "Harsh",
    //   "description": "Hiii Hello",
    //   "tag": "Personal",
    //   "date": "2023-07-10T04:21:19.317Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "64ab874d7ce39567af8e0b25",
    //   "user": "64a871678f32b7cc4059cede",
    //   "title": "Harsh456",
    //   "description": "Hiii Hello",
    //   "tag": "Personal",
    //   "date": "2023-07-10T04:21:33.647Z",
    //   "__v": 0
    // }
  ]

  const [notes, setNotes] = useState(notesInitial);


  // Get all note
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
      // body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)
    setNotes(json);

    // const note = {
    //   "_id": "64ab874d7ce39567af8e0b25",
    //   "user": "64a871678f32b7cc4059cede",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2023-07-10T04:21:33.647Z",
    //   "__v": 0
    // }
    // Push the note array
    // setNotes(notes.concat(note));
  }


  // Add a note
  const addNote = async (title, description, tag) => {

    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    
    const note = await response.json();
    setNotes(notes.concat(note));

      // "_id": "64ab874d7ce39567af8e0b25",
      // "user": "64a871678f32b7cc4059cede",
      // "title": title,
      // "description": description,
      // "tag": tag,
      // "date": "2023-07-10T04:21:33.647Z",
      // "__v": 0
    
    // Push the note array
  }

  // Delete a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
      // body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)
    // setNotes(json);

    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {

    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    // We cant change state directly
    let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    // It will provide the state of this note
    // Made a part of value
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;