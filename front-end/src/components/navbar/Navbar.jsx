import React from 'react'
import './Navbar.css'
import { assets } from '../assets/assets'

export const Navbar = () => {
    
  return (
    <div className='navbar'>
        <img src={assets.logo} alt="logo" />
        <div className="search-container">
        <input type="text" placeholder="Search..." className="search-bar" />
        </div>
        <div className="navbar-right">
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="basket_icon" />
                <div className="dot"></div>
            </div>
            <button>Sign In</button>
        </div>
    </div>
  )
}
