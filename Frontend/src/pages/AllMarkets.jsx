import React, { useState, useEffect } from 'react'
import marketService from '../services/marketService';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { updateUser } from '../store/authSlice';
import { MarketCard, Input } from '../components';


export default function AllMarkets() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.userData);
    const token = useSelector(state => state.auth.userToken);

    const [allMarkets, setAllMarkets] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!token)
            navigate('/login');
    }, [navigate, token])

    useEffect(() => {
        if (token) {
            ; (async () => {
                try {
                    setError('');
                    const res = await marketService.getAllMarkets(token, search);
                    setAllMarkets(res.markets)
                } catch (error) {
                    setError(error);
                    setAllMarkets([]);
                }
            })()
        }
    }, [token, search])


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
            <div className='flex flex-wrap justify-end px-4 w-full mt-36'>
                <Input
                    placeholder='Search By Title...'
                    className='w-1/4'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
