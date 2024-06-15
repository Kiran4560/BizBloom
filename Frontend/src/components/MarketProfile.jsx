import React, { useEffect, useState } from 'react'
import marketService from '../services/marketService';

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
        <div>
            test
        </div>
    )
}

export default MarketProfile
