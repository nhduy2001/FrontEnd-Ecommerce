import React from 'react'
import './Navbar.css'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

export const Navbar = ({setShowLogin}) => {
    
  return (
    <div className='navbar'>
        <Link to='/'><img className="logo" src={assets.logo} alt="logo" /></Link>
        <div className="search-container">
        <input type="text" placeholder="Search..." className="search-bar" />
        </div>
        <div className="navbar-right">
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="basket_icon" /></Link>
                <div className="dot"></div>
            </div>
            <button onClick={()=> setShowLogin(true)}>Sign In</button>
        </div>
    </div>
  )
}
