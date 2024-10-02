import React from "react";
import { VirtuosoGrid } from 'react-virtuoso';
import ChefCard from "../Components/ChefCard";

export default function ChefListContainer({ chefList }) {
    console.log(chefList);

    return (
        <div className="chef-list-container">
            <div className="chef-list-topbar">
                <h1>Top Chefs</h1>
                <a href="#">Show All</a>
            </div>
            <div className="virtuoso-container">
                <VirtuosoGrid
                    style={{ height: '600px', width: '100%' }} // Ensure the height and width are properly set
                    totalCount={chefList.length} // Total number of items
                    itemContent={(index) => {
                        const chef = chefList[index];
                        return (
                            <div className="chef-grid-item">
                                <ChefCard key={chef.chef_id} chef={chef} />
                            </div>
                        );
                    }}
                    listClassName="chef-grid" // Apply the grid layout class
                />
            </div>
        </div>
    );
}
