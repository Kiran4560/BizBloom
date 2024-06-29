import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MarketCard = ({ market, toggleFav, isFavourite, error }) => {
    const navigate = useNavigate();
    const { _id, title, phonenum, imageURL, address, description, reviews, rating } = market;
    const userData = useSelector(state => state.auth.userData);

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-400">
            {imageURL && <img className="w-full" src={imageURL} alt={title} />}
            <div className="px-6 py-4">
                {error && <span className="bg-red-500 text-slate-300 text-base">{error.message}</span>}
                {title && <div className="font-bold text-xl mb-2">{title}</div>}
                {description && <div className="font-semibold text-md mb-2 text-gray-600">{description}</div>}
                {address && <p className="text-gray-700 text-base">{address}</p>}
                {phonenum && <p className="text-gray-600 text-base">{phonenum}</p>}
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded duration-200"
                onClick={() => toggleFav(_id)}
            >
                {isFavourite ? "Remove from Favourite" : "Add To Favourite"}
            </button>
            <button
                className='bg-gray-700 hover:bg-gray-900 text-slate-400 hover:text-slate-200 py-2 px-4 rounded duration-200'
                onClick={() => navigate('/rateProduct', { state: { _id, title, imageURL, avgRating: rating, reviews } })}
            >
                {reviews.findIndex(item => item.user.toString() === userData.userId.toString()) !== -1 ? "Update Rating" : "Rate this Market"}
            </button>
        </div>
    );
};

export default MarketCard;
