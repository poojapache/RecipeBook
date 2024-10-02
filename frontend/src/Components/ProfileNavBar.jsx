import React,{useState} from "react";
import '../App.css';
import SignOut from "./SignOut";
import SearchBar from "./SearchBar";

export default function ProfileNavBar()
{
    const [signOut, showSignOut] = useState(false);

    const onClickProfilePicBtn = ()=>{
        showSignOut(!signOut);
    }

    return(
        <>
        <div className="nav-bar profile-navbar">
            <div className="logo-container">
                <h1 className="logo"><span>C</span>ookbook</h1>
            </div>
            <div className="searchbar-container">
                <SearchBar/>
            </div>
            <div className="nav-btns-container">
                <button className="btn login-btn" >Dashboard</button>
                <button className="btn login-btn" >My Cookbook</button>
                {/* <button className="btn sign-up-btn" >Sign Out</button> */}
                <button className="profile-pic-container" onClick={onClickProfilePicBtn}>
                    <img src="./logo192.png" className="profile-pic-small"/>
                </button>
            </div>
        </div>
        {signOut?<SignOut/>:''}
        </>
    )
}