import React from 'react';
import '../App.css';
import { useDispatch } from "react-redux";
import { login, signup } from "../Redux/Actions/loginSignUpAction";

export default function NavBar()
{
    const dispatch = useDispatch();

    const onClickSignUp = ()=>{
        console.log('SignUp function');
        dispatch(signup());
    };

    const onClickLogin = ()=>{
        dispatch(login());
    }

    return(
        <div className="nav-bar">
            <div className="logo-container">
                <h1 className="logo"><span>C</span>ookbook</h1>
            </div>
            <div className="nav-btns-container">
                <button className="btn login-btn" onClick={onClickLogin}>Login</button>
                <button className="btn sign-up-btn" onClick={onClickSignUp}>Sign Up</button>
            </div>
        </div>
    );
}