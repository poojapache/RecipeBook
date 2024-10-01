import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileNavBar from "../Components/ProfileNavBar";
import GreetingBar from "../Components/GreetingBar";
import ChefListContainer from "./ChefListContainer";

export default function ProfileContainer()
{
    const [chefs, setChefs] = useState([]);
    const username = '';
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/chefs/`)
        .then(response => {
            console.log(response.data);
            setChefs(response.data);
        })
        .catch(error => {
            console.error("Error fetching chefs:", error);
        });
    }, []);

    return(
    <div>
        <ProfileNavBar/>
        <GreetingBar username={username}/>
        <ChefListContainer chefList={chefs}/>
    </div>
    );
}