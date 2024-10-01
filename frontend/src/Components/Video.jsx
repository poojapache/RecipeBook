import React from 'react';
import '../App.css';

export default function Video(){
    return(
            <div className='video-container'>
                <video autoPlay loop muted className="video">
                    <source src="/background.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                </video>
            </div>
    );
}