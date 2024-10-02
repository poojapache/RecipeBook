import React from "react";

export default function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <img className="recipe-img" src={recipe.recipe_img_url} alt={recipe.recipe_name} />

            <div className="recipe-details">
                <h3 className="recipe-name">{recipe.recipe_name}</h3>
                <a className="recipe-link" href="#">
                    View Recipe
                </a>
            </div>
        </div>
    );
}
