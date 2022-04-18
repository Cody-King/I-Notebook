import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const Review = (props) => {
    const context = useContext(noteContext)
    const {credentials} = context;

    const reviewClose = ()=>{
        document.body.querySelector('.reviewWindow').style.right='-40%';
        document.body.querySelector('.container').style.margin='70px 105px';
        document.body.querySelector('.wrapper').style.gridTemplateColumns='repeat(4, 265px)';
    }

    const onchange = (e)=>{
        e.preventDefault()
    }
    console.log(credentials)
    return (
            <div className='reviewWindow'>
            <div className="popup">
                <div className="content">
                    <header>
                        <p>Review</p>
                        <i className="fa-solid fa-xmark" onClick={reviewClose}></i>
                    </header>
                    <form action="#">
                        <div className="row title">
                            <label>Title</label>
                            <input type="text" defaultValue={credentials.title} onChange={onchange} disabled x-moz-errormessage="You can't change this as it is the review window."/>
                        </div>
                        <div className="row description">
                            <label>Description</label>
                            <textarea placeholder={credentials.description} disabled onChange={onchange} x-moz-errormessage="You can't change this as it is the review window."></textarea>
                        </div>
                        <div className="row tag">
                            <label>Tag</label>
                            <input type="text" placeholder={credentials.tag} disabled onChange={onchange} x-moz-errormessage="You can't change this as it is the review window."/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Review