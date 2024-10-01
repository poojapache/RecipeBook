import React, { useState } from "react";
import { VirtuosoGrid } from 'react-virtuoso'; // Importing VirtuosoGrid
import ChefCard from "../Components/ChefCard";

export default function ChefListContainer({ chefList }) {
    const [showAll, setShowAll] = useState(false); // State to toggle showAll

    // Handle "Show All" button click
    const toggleShowAll = () => {
        setShowAll((prevState) => !prevState); // Toggle between true/false
    };

    // Calculate the number of chefs to show based on `showAll`
    const chefsToShow = showAll ? chefList.length : 3; // Show all or just 3

    // Dynamic height based on `showAll`
    const containerHeight = showAll ? 'auto' : '300px';

    return (
        <div className="chef-list-container" style={{ height: containerHeight }}>
            <div className="chef-list-topbar">
                <h1>Top Chefs</h1>
                <a href="#" onClick={toggleShowAll}>
                    {showAll ? "Show Less" : "Show All"} {/* Toggle button text */}
                </a>
            </div>
            <div className="virtuoso-container">
                <VirtuosoGrid
                    style={{ height: '100%', width: '100%' }} // Ensure full width and dynamic height
                    totalCount={chefsToShow} // Show only first 3 items initially, all when "Show All" is clicked
                    itemContent={(index) => {
                        const chef = chefList[index];
                        return (
                            <div className="chef-grid-item">
                                <ChefCard key={chef.chef_id} chef={chef} />
                            </div>
                        );
                    }}
                    listClassName="chef-grid" // Apply grid layout class
                />
            </div>
        </div>
    );
}
