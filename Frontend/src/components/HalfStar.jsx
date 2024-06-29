import React from 'react';
import { Star } from 'lucide-react';

const HalfStar = () => (
    <div className='relative inline-block'>
        <Star fill="gray" stroke="gray" />
        <Star
            fill="gold"
            stroke="gold"
            className='absolute top-0 left-0'
            style={{
                clipPath: "inset(0 50% 0 0)",
            }}
        />
    </div>
);

export default HalfStar;
