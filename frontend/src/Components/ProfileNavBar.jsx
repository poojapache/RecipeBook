import React from "react";
import '../App.css';

export default function ProfileNavBar()
{
    return(
        <div className="nav-bar profile-navbar">
            <div className="logo-container">
                <h1 className="logo"><span>C</span>ookbook</h1>
            </div>
            <div className="nav-btns-container">
                <button className="btn login-btn" >Dashboard</button>
                <button className="btn login-btn" >My Cookbook</button>
                <button className="btn sign-up-btn" >Sign Out</button>
            </div>
        </div>
    )
}