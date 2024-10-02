import React from "react";
import GreetingBar from "./GreetingBar";

export default function SignOut()
{
    const username = 'Pooja';
    return(
        <div className="sign-out-container">
            <div className="triangle"></div>
            <GreetingBar username={username}/>
            <button className="btn sign-out-btn">Sign Out</button>
        </div>
    )
}