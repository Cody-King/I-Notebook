import React from 'react'
import { Link, useLocation } from "react-router-dom";


const Navbar = () => {
    let location = useLocation()
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <div className="hamburger">
                <div className="ham"></div>
                <div className="ham"></div>
                <div className="ham"></div>
            </div>
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
                    Dropdown
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/">Action</Link></li>
                    <li><Link className="dropdown-item" to="/">Another action</Link></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                </ul>
                </li>
            </ul>
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success mx-2" type="submit">Login</button>
                <button className="btn btn-outline-success" type="submit">SignUp</button>
            </form>
            </div>
        </div>
        </nav>
    )
}

export default Navbar
