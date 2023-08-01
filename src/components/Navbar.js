import React from 'react';
import {
    Link, useLocation
} from "react-router-dom";
import { useHistory } from 'react-router-dom';

const Navbar = () => {

    let history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

    let location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    { !localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-outline-success mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-outline-success mx-2" to="/signup" role="button">Signup</Link>
                    </form>: <button onClick={handleLogout} className='btn brn-primary'>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
