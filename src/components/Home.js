import React, {useState, useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes';

const Home = () => {
    const [open, setopen] = useState(true)
    const context = useContext(noteContext)
    const {addNote} = context;
    const [note, setnote] = useState({title:"", description:"", tag:"default"})

    const add = (e) => {
        setopen(!open) 
        e.preventDefault();
    }

    const addclick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setopen(!open)
        // add();
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
                        <p>Add a new note</p>
                        <i className="fa-solid fa-xmark" onClick={add}></i>
                    </header>
                    <form action="#">
                        <div className="row title">
                            <label>Title</label>
                            <input type="text" name="title" id="title" onChange={onchange}/>
                        </div>
                        <div className="row description">
                            <label>Description</label>
                            <textarea onChange={onchange} id="description" name='description'></textarea>
                        </div>
                        <div className="row tag">
                            <label>Tag</label>
                            <input type="text" name="tag" id="tag" onChange={onchange}/>
                        </div>
                        <button onClick={addclick} href="/">Add note</button>
                    </form>
                </div>
            </div>
        </div>
            <div className="wrapper">
                <li className='add-box'>
                    <div className="icon" onClick={add}><i className="fa-solid fa-circle-plus"></i></div>
                    <p>Add new note</p>
                </li>
                <Notes/>
            </div>
        </>
    )
}

export default Home
