import React, {useContext, useEffect, useState} from 'react'
import noteContext from '../context/notes/noteContext'; 
import NoteItem from './NoteItem';

const Notes = () => {
    const [open, setopen] = useState(true)
    const context = useContext(noteContext)
    const {notes, getNotes, editNote} = context;
    const [note, setnote] = useState({id:"", etitle:"", edescription:"", etag:""})
    useEffect(() => {getNotes()}, [])

    const add = (e) => {
        setopen(!open)
        e.preventDefault();
    }
    
    const updateNote = (title, description, tag, id)=>{
        setnote({id: id, etitle: title, edescription: description, etag: tag})
        setopen(!open)
    }   

    const addclick = (e)=>{
        e.preventDefault();
        setopen(!open)
        editNote(note.id, note.etitle, note.edescription, note.etag)
    }
    const onchange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
        <div className={open?"popup-box":"popup-box show"}>
            <div className="popup">
                <div className="content">
                    <header>
                        <p>Edit a note</p>
                        <i className="fa-solid fa-xmark" onClick={add}></i>
                    </header>
                    <form action="#">
                        <div className="row title">
                            <label>Title</label>
                            <input type="text" name="etitle" id="etitle" value={note.etitle} onChange={onchange}/>
                        </div>
                        <div className="row description">
                            <label>Description</label>
                            <textarea onChange={onchange} id="edescription" name='edescription' value={note.edescription}></textarea>
                        </div>
                        <div className="row tag">
                            <label>Tag</label>
                            <input type="text" name="etag" id="etag" value={note.etag} onChange={onchange}/>
                        </div>
                        <button onClick={addclick} href="/">Update note</button>
                    </form>
                </div>
            </div>
        </div>
            {notes.map((note)=>{
                return <NoteItem key={note._id} updateNote={updateNote} id={note._id} title={note.title} description={note.description} tag={note.tag}/>
            })}
        </>
    )
}

export default Notes