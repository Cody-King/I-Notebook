import NoteContext from "./noteContext";
import React, {useState} from 'react'

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes , setNotes ] = useState(notesInitial)

    // Get all notes
    const getNotes = async ()=>{
        // Api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZmUyNjM3YzFhMzAxNWI4ZmYxMzBkIn0sImlhdCI6MTY0OTQxMjc0MH0.aZ2am2lwg1Xf_hoagXNmPDQ5BJjPxRvq8XDUC8hukCo'
            }
        })
        const json = await response.json();
        setNotes(json)
    }

        // Add a note
        const addNote = async (title, description, tag, id)=>{
            // Api call
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZmUyNjM3YzFhMzAxNWI4ZmYxMzBkIn0sImlhdCI6MTY0OTQxMjc0MH0.aZ2am2lwg1Xf_hoagXNmPDQ5BJjPxRvq8XDUC8hukCo'
                },
                body: JSON.stringify({title, description, tag})
            });
            const json = response.json();

            const note = {
                "_id": "6250107c0a7401bedc843cg3",
                "user": "624fe2637c1a3015b8ff130d",
                "title": title,
                "description": description,
                "tag": tag,
                "date": "1649414268104",
                "__v": 0
                };
            setNotes(notes.concat(note))
            getNotes()
        }

        // Delete a note
        const deleteNote = async (id)=>{
            // Api call
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZmUyNjM3YzFhMzAxNWI4ZmYxMzBkIn0sImlhdCI6MTY0OTQxMjc0MH0.aZ2am2lwg1Xf_hoagXNmPDQ5BJjPxRvq8XDUC8hukCo'
                }
            });
            const json = response.json();
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
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZmUyNjM3YzFhMzAxNWI4ZmYxMzBkIn0sImlhdCI6MTY0OTQxMjc0MH0.aZ2am2lwg1Xf_hoagXNmPDQ5BJjPxRvq8XDUC8hukCo'
                },
                body: JSON.stringify({title, description, tag})
            });
            const json = response.json();
            
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
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
