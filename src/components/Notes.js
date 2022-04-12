import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'; 
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext)
    const {notes, getNotes} = context;
    useEffect(() => {getNotes()}, [])
    
    // const updateNote = (note)=>{
        
    // }
    return (
        <>
            {notes.map((note)=>{
                return <NoteItem key={note._id} id={note._id} title={note.title} description={note.description} tag={note.tag}/>
            })}
        </>
    )
}

export default Notes