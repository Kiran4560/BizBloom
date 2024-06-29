import React, { useEffect, useState } from 'react'
import marketService from '../services/marketService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MarketProfile() {
    const userData = useSelector(state => state.auth.userData);
    const token = useSelector(state => state.auth.userToken)
    const navigate = useNavigate();

    const [myMarkets, setMyMarkets] = useState([]);
    const [error, setError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!token)
            navigate('/login')
    }, [navigate, token])

    useEffect(() => {
        ; (async () => {
            try {
                const res = await marketService.getUserMarket(token);
                if (res)
                    setMyMarkets(res.Usermarkets);
            } catch (error) {
                setError(error);
                setMyMarkets([]);
            }
        })()
    }, [token, isDeleting])

    const updatePost = (data) => {
        navigate('/createMarket', {
            state: data
        })
    }

    const deletePost = async (_id) => {
        try {
            setError('');
            const res = await marketService.deleteMarket(_id, token);
            if (res) {
                setIsDeleting(true);
                setMyMarkets((prevMarkets) => prevMarkets.filter((market) => market._id !== _id))
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <div className="flex flex-wrap justify-center items-center w-full h-2/3 mt-48 space-x-2">
                {
                    myMarkets?.map(({ location, _id, title, phonenum, imageURL, address, description, rating, reviews, openingTime, closingTime, profession }) => (
                        <div key={_id} className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-400">
                            {imageURL && <img className="w-full" src={imageURL} alt={title} />}
                            <div className="px-6 py-4">
                                {error && <span className="bg-red-500 text-slate-300 text-base">{error.message}</span>}
                                {title && <div className="font-bold text-xl mb-2">{title}</div>}
                                {description && <div className="font-semibold text-md mb-2 text-gray-600">{description}</div>}
                                {address && <p className="text-gray-700 text-base">{address}</p>}
                                {phonenum && <p className="text-gray-600 text-base">{phonenum}</p>}
                            </div>
                            <button
                                className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-2"
                                onClick={() => updatePost({ location, _id, title, phonenum, imageURL, address, description, rating, reviews, openingTime, closingTime, profession })}
                            >Update</button>
                            <button
                                className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded m-2"
                                onClick={() => deletePost(_id)}
                            >Delete</button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default MarketProfile
