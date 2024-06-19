import React, { useEffect, useState } from 'react'
import marketService from '../services/marketService';
import { Link } from 'react-router-dom';

function MarketProfile() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token')

    const [userData, setUserData] = useState(null);
    const [myMarkets, setMyMarkets] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (token)
            setUserData(user);
        else
            navigate('/login')
    }, [user, token])

    useEffect(() => {
        ; (async () => {
            try {
                const res = await marketService.getUserMarket();
                if (res)
                    setMyMarkets(res.Usermarkets);
            } catch (error) {
                setError(error);
                setMyMarkets([]);
            }
        })()
    }, [])

    return (
        <>
            <div className="flex flex-wrap justify-center items-center w-full h-2/3 mt-48 space-x-2">
                {
                    myMarkets.map(({ location, _id, title, phonenum, imageURL, address, description, rating, reviews, openingTime, closingTime, profession }) => (
                        <div key={_id} className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-400">
                            {imageURL && <img className="w-full" src={imageURL} alt={title} />}
                            <div className="px-6 py-4">
                                {title && <div className="font-bold text-xl mb-2">{title}</div>}
                                {description && <div className="font-semibold text-md mb-2 text-gray-600">{description}</div>}
                                {address && <p className="text-gray-700 text-base">{address}</p>}
                            </div>
                        </div>
                    ))
                }

            </div>

            <Link to='/createMarket' className='flex items-center justify-center mt-4'>
                <button className='inline-flex w-1/3 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/50 hover:text-white/90 active:bg-gray-900/80 transition ease-in-out duration-150'>
                    Add New Market
                </button>
            </Link>
        </>
    )
}

export default MarketProfile
