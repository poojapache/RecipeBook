import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileNavBar from "../Components/ProfileNavBar";
import GreetingBar from "../Components/GreetingBar";
import ChefListContainer from "./ChefListContainer";
import RecipeListContainer from "./RecipeListContainer";

export default function ProfileContainer()
{
    const [recipes, setRecipes] = useState([]);
    const [chefs, setChefs] = useState([]);
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/recipes/`)
        .then(response => {
            console.log(response.data);
            setRecipes(response.data);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });

        // axios.get(`${process.env.REACT_APP_API_URL}/chefs/`)
        // .then(response => {
        //     console.log(response.data);
        //     setRecipes(response.data);
        // })
        // .catch(error => {
        //     console.error("Error fetching recipes:", error);
        // });

    }, []);

    return(
    <div>
        <ProfileNavBar/>
        <div className="profile-content-container">
            <RecipeListContainer recipeList={recipes}/>
        </div>
        
        {/* <ChefListContainer chefList={chefs}/> */}
    </div>
    );
}