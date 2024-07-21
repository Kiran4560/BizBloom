import React, { useState, useEffect } from 'react'
import marketService from '../services/marketService';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { updateUser } from '../store/authSlice';
import { MarketCard, Input, InputWithRef } from '../components';


export default function AllMarkets() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.userData);
    const token = useSelector(state => state.auth.userToken);

    const [allMarkets, setAllMarkets] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [isSortByRating, setIsSortByRating] = useState(false);

    useEffect(() => {
        if (!token)
            navigate('/login');
    }, [navigate, token])

    useEffect(() => {
        if (token) {
            ; (async () => {
                try {
                    setError('');
                    const res = await marketService.getAllMarkets(token, search, "", isSortByRating ? "rating" : "");
                    setAllMarkets(res.markets)
                } catch (error) {
                    setError(error);
                    setAllMarkets([]);
                }
            })()
        }
    }, [token, search, isSortByRating])


    const toggleFav = async (_id) => {
        try {
            setError('');
            const res = await authService.toggleFavMarket({ userId: userData.userId, marketId: _id });
            console.log(res);
            let updatedFavourites;
            if (res.message === "Removed from favourites") {
                updatedFavourites = userData.favourites.filter((favId) => favId !== _id);
            }
            else {
                updatedFavourites = [...userData.favourites, _id];
            }
            dispatch(updateUser({ userData: { ...userData, favourites: updatedFavourites } }))
        } catch (error) {
            setError(error);
        }
    }

    return (
        <>
            <div className='flex flex-wrap justify-end px-4 w-full mt-36 space-x-3'>
                <Input
                    placeholder='Search By Title...'
                    className='w-1/4'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {/* <label htmlFor='sortbyRating'>Sort By Rating</label>
                <input type="checkbox" name="Sort by Rating" id="sortbyRating" checked={isSortByRating} onChange={() => setIsSortByRating((prev) => !prev)} /> */}
                <InputWithRef
                    label='Sort By Rating'
                    type='checkbox'
                    checked={isSortByRating}
                    setIsSortByRating={setIsSortByRating}
                    onChange={() => setIsSortByRating((prev) => !prev)}
                    className='h-5'
                />
            </div>
            <div className="flex flex-wrap justify-center items-center w-full h-2/3 mt-24 mb-48 space-x-2 space-y-2">
                {allMarkets?.map(market => (
                    <MarketCard
                        key={market._id}
                        market={market}
                        toggleFav={toggleFav}
                        isFavourite={userData?.favourites.includes(market._id)}
                        error={error}
                    />
                ))}

            </div>
        </>
    )
}
