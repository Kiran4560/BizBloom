import React from "react";
import { Star, Star as StarOutline } from "lucide-react";
import { HalfStar, Tooltip } from "../components";

const RatingStar = ({ rating, maxRating = 5 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <Tooltip text={`Rating: ${rating.toFixed(2)}/5.00`}>
            <div className="flex">
                {Array.from({ length: fullStars }, (_, index) => (
                    <Star key={index} fill="gold" stroke="gold" />
                ))}
                {hasHalfStar && <HalfStar />}
                {Array.from({ length: emptyStars }, (_, index) => (
                    <StarOutline key={index} fill="gray" stroke="gray" />
                ))}
            </div>
        </Tooltip>
    );
};

export default RatingStar;
