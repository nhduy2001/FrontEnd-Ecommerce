import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../assets/assets";

const LoginPopup = ({setShowLogin}) => {
    const [currState,setCurrState] = useState("Login")

    return (
        <div className="login-popup">
        <form className="login-popup-container" action="">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false )} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
                {currState==="Login"?<></>:<input type="text" placeholder="Your name" required/>}
                <input type="text" placeholder="Your username" required/>
                <input type="password" placeholder="Your password" required/>
            </div>
            <button>{currState==="Sign Up" ? "Create account" : "Login"}</button>
            {currState==="Login"
            ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here!</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here!</span></p>
            }
            
        </form>
        </div>
    );
};

export default LoginPopup;
