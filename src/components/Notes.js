import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'; 
import NoteItem from './NoteItem';
import Review from './Review';

const Notes = (props) => {
    let history = useHistory();
    const [open, setopen] = useState(true)
    const context = useContext(noteContext)
    const {notes, getNotes, editNote, setcredentials} = context;
    const [note, setnote] = useState({id:"", etitle:"", edescription:"", etag:""})
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else{
            history.push('/login')
        }
    },[getNotes, history])

    const add = (e) => {
        setopen(!open)
        e.preventDefault();
    }
    
    const updateNote = (title, description, tag, id)=>{
        setnote({id: id, etitle: title, edescription: description, etag: tag})
        setopen(!open)
    }   

    const reviewNote = (rtitle, rdescription, rtag)=>{
        setcredentials({title: rtitle, description: rdescription, tag: rtag})
        document.body.querySelector('.reviewWindow').style.right='0px';
        document.body.querySelector('.container').style.margin='70px 0px';
        document.body.querySelector('.wrapper').style.gridTemplateColumns='repeat(3, 265px)';
    }
    
    const addclick = (e)=>{
        e.preventDefault();
        setopen(!open)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        props.showAlert("Updated successfully", "success")
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
                        <button disabled={note.etitle.length === 0 || note.edescription.length === 0} onClick={addclick} href="/">Update note</button>
                    </form>
                </div>
            </div>
        </div>
        <Review/>
            {notes.map((note, index)=>{
                return <NoteItem index={index} key={note._id} reviewNote={reviewNote} updateNote={updateNote} showAlert={props.showAlert} id={note._id} title={note.title} description={note.description} tag={note.tag}/>
            })}
        </>
    )
}

export default Notes