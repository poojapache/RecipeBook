import React from "react";

export default function ChefCard({ chef }) {
    console.log(chef);
    return (
        <div className="chef-card-container">
            <div>
                {/* Conditional rendering for the image */}
                {chef.chef_img_url ? (
                    <img 
                        src={chef.chef_img_url} 
                        alt={`${chef.chef_full_name}`} 
                    />
                ) : (
                    <img 
                        src="/logo192.png" // Replace with an actual placeholder image URL if desired
                        alt="Placeholder"
                    />
                )}
            </div>
            <div>
                <p>{chef.chef_full_name}</p>
            </div>
        </div>
    );
}
