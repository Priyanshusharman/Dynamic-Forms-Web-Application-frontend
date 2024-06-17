import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    MedWander
                </Link>
                <div className="navbar-link-button-main">
                    <Link to="/form/A" className="navbar-link-button" >Form A</Link>
                    <Link to="/form/B" className="navbar-link-button">Form B</Link>
                    <Link to="/" className="navbar-link-button">Home</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
