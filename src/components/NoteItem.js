import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'; 

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote, editNote} = context
    // const {note} = props
    return (
        <>
        <li className="note">  
            <div className="details">
                <p>{props.title}</p>
                <span>{props.description}</span>
            </div>
            <div className="bottom-content">
                <span>April 10, 2022</span>
                <div className="settings">
                    <i className="fa-solid fa-ellipsis"></i>
                    <ul className="menu">
                        <li><i className="fa-solid fa-eye"></i>Review</li>
                        <li><i className="fa-solid fa-pen" onClick={()=>{editNote(props.id)}}></i>Edit</li>
                        <li onClick={()=>{deleteNote(props.id)}}><i className="fa-solid fa-trash-can" ></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>
        </>
    )
}

export default NoteItem