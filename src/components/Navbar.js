import React from 'react'
import { Link, useLocation, useHistory } from "react-router-dom";


const Navbar = (props) => {
    let history = useHistory();
    let location = useLocation()

    const logout = ()=>{
        localStorage.removeItem('token')
        history.push('/login')
    }
    
    // // Function to search a particular card into the collection
    // let search = document.getElementById('searchTxt');
    // search.addEventListener('input', ()=>{
    //     let inputVal = search.value.toLowerCase();
    //     let noteCard = document.getElementsByClassName('noteCard');
    //     // converting the notecard in array and then running a foreach loop for all the cards
    //     Array.from(noteCard).forEach(function (element) {
    //         // getting the value of text by tag name 
    //         let cardTxt = element.getElementsByTagName("p")[0].innerText;
    //         // checking the value if present in any of the card
    //         if(cardTxt.includes(inputVal)){
    //             element.style.display = "block"; 
    //         }
    //         else{
    //             element.style.display = "none"; 
    //         }
    //     });
    // })

    // let menuToggle = document.querySelector('.menuToggle')
    // let navigation = document.querySelector('.navigation')

    // const menuClick = ()=>{
    //     navigation.classList.toggle('active')
    // }
    return (
        <nav className={`navbar navbar-expand-lg position-sticky navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
            {/* <div className="navigation">
                <div className="userBx">
                    <div className="imgBx">
                        <img src="dev.jpg" alt="" />
                    </div>
                    <p className="username">Dev Yadav</p>
                </div>
                <div className="menuToggle" onClick={menuClick}></div>
            </div> */}
            <Link className="navbar-brand title" to="/"><i className="fa-solid fa-book icon"> I-Notebook</i></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about"? "active": ""}`} to="/about">About</Link>
                </li>
                <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Mode
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><button className="dropdown-item" onClick={props.togglemode}>Dark Mode</button></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><button className="dropdown-item" onClick={props.togglemode}>Light Mode</button></li>
                </ul>
                </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <Link className="btn btn-outline-success mx-2" type="submit" to="/login">Login</Link>
                <Link className="btn btn-outline-success" type="submit" to="/signup">SignUp</Link>
            </form>: <button className="btn btn-outline-success" onClick={logout} type="submit">Logout</button>}
            </div>
        </div>
        </nav>
    )
}

export default Navbar
