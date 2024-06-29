import React, { useState, forwardRef } from 'react';
import { Star } from 'lucide-react';

// const arr = ['Very Bad', 'Bad', 'Good', 'Very Good', 'Excellent'];
const RatingStar = forwardRef(({ value, onChange }, ref) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (value) => {
        onChange(value);
    };

    const handleMouseEnter = (value) => {
        setHoverRating(value);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const renderStars = () => {
        const stars = [];
        const maxRating = 5; // Maximum rating stars

        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <Star
                    key={i}
                    onClick={() => handleClick(i)}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    fill={i <= (hoverRating || value) ? 'gold' : 'gray'}
                    stroke={i <= (hoverRating || value) ? 'gold' : 'gray'}
                    className='cursor-pointer'
                    size={24} // You can change this value to set the size of the stars
                />
            );
        }
        return stars;
    };

    return (
        <div>
            {/* <p>Your rating: {hoverRating || value}</p> */}
            <div className='flex space-x-2'>
                {renderStars()}
                {/* {<span>{hoverRating !== 0 ? arr[hoverRating - 1] : (value !== 0 ? arr[value - 1] : '')}</span>} */}
                <span>{hoverRating || value}</span>
            </div>
        </div>
    );
});

export default RatingStar;
