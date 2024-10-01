import React from "react";
import WelcomeText from "../Components/WelcomeText";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import { useSelector } from "react-redux";


export default function ContentContainer()
{
    const activeContent = useSelector((state)=> state.loginSignUp.content);
    console.log('Active Content:', activeContent);
    return(
        <div className="content-container">
            {activeContent === 'S' && <SignUp />}
            {activeContent === 'L' && <Login />}
            {!activeContent && <WelcomeText />}
        </div>
    );
}