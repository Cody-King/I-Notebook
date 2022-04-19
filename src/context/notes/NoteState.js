import NoteContext from "./noteContext";
import React, {useState} from 'react'

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes , setNotes ] = useState(notesInitial)
    const [data, setdata] = useState([])

    // Get all notes
    const getNotes = async ()=>{
        // Api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setNotes(json)
    }

        // Add a note
        const addNote = async (title, description, tag)=>{
            // Api call
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({title, description, tag})
            });
            const note = await response.json();
            setNotes(notes.concat(note))
            // getNotes()
        }

        // Delete a note
        const deleteNote = async (id)=>{
            // Api call
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            response.json();
            const newNotes = notes.filter((note)=>{return note._id !== id})
            setNotes(newNotes)
        }

        // Edit a note
        const editNote = async (id, title, description, tag)=>{
            // Api call
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({title, description, tag})
            });
            response.json();
            
            let newNotes = JSON.parse(JSON.stringify(notes))
            for (let index = 0; index < newNotes.length; index++) {
                const element = newNotes[index];
                if (element._id === id) {
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    newNotes[index].tag = tag;
                    break;
                }
            }
            setNotes(newNotes)
        }

        const [credentials, setcredentials] = useState([{title:"", description:"", tag:""}])

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes, data, setdata, setcredentials, credentials}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
