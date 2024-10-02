import React, { useState, useEffect, useMemo } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import RecipeCard from "../Components/RecipeCard";
import axios from "axios";

export default function RecipeListContainer() {
    const [recipeList, setRecipeList] = useState([]);
    const [isShowingAll, setIsShowingAll] = useState(false);
    const [pageSize, setPageSize] = useState(3); // Default page size
    const [totalRecipes, setTotalRecipes] = useState(0);

    const fetchRecipes = async (pageSize) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/recipes/?page=1&size=${pageSize}`);
            setRecipeList(response.data.results);
            setTotalRecipes(response.data.count);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    useEffect(() => {
        fetchRecipes(pageSize);
    }, [pageSize]);

    // Memoize the recipe list to avoid re-fetching or recalculating when toggling
    const memoizedRecipeList = useMemo(() => recipeList, [recipeList]);

    const handleShowAll = () => {
        setIsShowingAll(true);
        setPageSize(totalRecipes); // Set the page size to total recipes
    };

    const handleShowLess = () => {
        setIsShowingAll(false);
        setPageSize(3);
    };

    return (
        <div className="recipe-list-container">
            <div className="recipe-list-topbar">
                <h1>Recipes for you</h1>
                {!isShowingAll ? (
                    <a onClick={handleShowAll} style={{ cursor: 'pointer' }}>
                        Show All
                    </a>
                ) : (
                    <a onClick={handleShowLess} style={{ cursor: 'pointer' }}>
                        Show Less
                    </a>
                )}
            </div>
            <VirtuosoGrid
                style={{ height: '400px', width: '100%' }}
                totalCount={memoizedRecipeList.length}
                itemContent={(index) => {
                    const recipe = memoizedRecipeList[index];
                    return (
                        <div className="recipe-grid-item">
                            <RecipeCard key={recipe.recipe_id} recipe={recipe} />
                        </div>
                    );
                }}
                listClassName="recipe-grid"
            />
        </div>
    );
}
