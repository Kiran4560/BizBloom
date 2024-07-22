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
    const userLocation = useSelector(state => state.auth.userLocation);
    const userData = useSelector(state => state.auth.userData);
    const token = useSelector(state => state.auth.userToken);

    const [allMarkets, setAllMarkets] = useState([]);
    const [allProfessions, setAllProfessions] = useState([]);
    const [selectedProfession, setSelectedProfession] = useState("");
    const [isSortByRating, setIsSortByRating] = useState(false);
    const [isSortByDistance, setIsSortByDistance] = useState(false);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token)
            navigate('/login');
    }, [navigate, token])

    useEffect(() => {
        if (token) {
            ; (async () => {
                try {
                    setError('');
                    const res = await marketService.getAllMarkets(token, search, selectedProfession, isSortByRating ? "rating" : "", isSortByDistance ? userLocation?.latitude : "", isSortByDistance ? userLocation?.longitude : "");
                    setAllMarkets(res.markets);
                    setAllProfessions(res.markets.map(item => item.profession).filter((v, i, a) => a.indexOf(v) === i)); // Get unique professions
                } catch (error) {
                    setError(error);
                    setAllMarkets([]);
                }
            })()
        }
    }, [token, search, isSortByRating, selectedProfession, isSortByDistance])


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
            <div className='flex flex-wrap justify-evenly px-4 w-full mt-36 space-x-3'>
                <Input
                    placeholder='Search By Title...'
                    className='w-1/4'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="border rounded px-4 py-2 text-sm bg-gray-700"
                    value={selectedProfession}
                    onChange={(e) => setSelectedProfession(e.target.value)}
                >
                    <option value="" className='text-sm bg-gray-700'>All Professions</option>
                    {allProfessions.map((profession, index) => (
                        <option key={index} value={profession} className='text-sm bg-gray-700'>{profession}</option>
                    ))}
                </select>

                <InputWithRef
                    label='Sort By Rating'
                    type='checkbox'
                    checked={isSortByRating}
                    setIsSortByRating={setIsSortByRating}
                    onChange={() => setIsSortByRating((prev) => !prev)}
                    className='h-5'
                />

                <InputWithRef
                    label='Sort By Distance'
                    type='checkbox'
                    checked={isSortByDistance}
                    setIsSortByRating={setIsSortByDistance}
                    onChange={() => setIsSortByDistance((prev) => !prev)}
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
