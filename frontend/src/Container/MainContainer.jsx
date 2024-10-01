import React from "react";
import Video from "../Components/Video";
import NavBar from "../Components/NavBar";
import ContentContainer from "./ContentContainer";

export default function MainContainer()
{
    return(
        <>
        
        <div className="overlay">
            <NavBar/>
            <Video/>
            <ContentContainer/>
        </div>
        </>
    );
}