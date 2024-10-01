import React from "react";

export default function GreetingBar({username})
{
    return(
        <div className="greeting-container">
            <p className="greeting">
                😋 Welcome, {!username ? "User" : username}!
            </p>
            <hr/>
        </div>
    );
}