import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'; 
import Review from './Review';

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote} = context

    // const toggleRev = ()=>{
    //     props.setreview(!props.review)
    // }
    // console.log(props.index)

    const toggleRev = ()=>{
        console.log(props.id, props.title, props.description, props.tag)
        return props.title;
    }

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
                        <li onClick={()=>{props.reviewNote(props.title, props.description, props.tag)}}><i className="fa-solid fa-eye"></i>Review</li>
                        <li onClick={()=>{props.updateNote(props.title, props.description, props.tag, props.id)}}><i className="fa-solid fa-pen"></i>Edit</li>
                        <li onClick={()=>{deleteNote(props.id);props.showAlert("Deleted successfully", "success")}}><i className="fa-solid fa-trash-can" ></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>
        {/* <Review toggleRev={toggleRev}/> */}
        </>
    )
}

export default NoteItem