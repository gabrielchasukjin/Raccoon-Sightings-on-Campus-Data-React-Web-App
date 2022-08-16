import React from 'react'

function Navbar() {
    return(
        <nav className="navbar">
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
            </style>
            <img src = {require("../images/earth.png")}alt="Earth" className="nav-image"/> 
            <h3 className="nav-title">UC San Diego Raccoon Spotting</h3>
        </nav>
    )
}

export default Navbar
