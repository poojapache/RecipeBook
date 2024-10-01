import React from "react";
import '../App.css';
import '../animation.css'

export default function WelcomeText()
{
    return(
        <div className="welcome-text-container">
            <p className="primary-text">Bon Appétit<br /><span className="secondary-text">Let's cook something delicious!</span></p>
        </div>
    );
}