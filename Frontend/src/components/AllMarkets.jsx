import React, { useState, useEffect } from 'react'
import marketService from '../services/marketService';
import { useNavigate } from 'react-router-dom';

const inputFieldStyle = "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50";

export default function AllMarkets() {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const [userData, setUserData] = useState(null);
    const [allMarkets, setAllMarkets] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (token)
            setUserData(user);
        else {
            setUserData(null);
            setAllMarkets([]);
            navigate('/login')
        }
    }, [user, token])

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

    return (
        <>
            <div className='flex flex-wrap justify-end px-4 w-full mt-36'>
                <input
                    placeholder='Search By Title...'
                    className={`w-1/4 ${inputFieldStyle}`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="flex flex-wrap justify-center items-center w-full h-2/3 mt-24 mb-48 space-x-2 space-y-2">
                {
                    allMarkets?.map(({ location, _id, title, phonenum, imageURL, address, description, rating, reviews, openingTime, closingTime, profession }) => (
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
        </>
    )
}
