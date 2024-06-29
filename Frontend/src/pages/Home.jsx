import React, { useEffect } from 'react'
import { About, Features } from "../components/index"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Home() {
    const token = useSelector(state => state.auth.userToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (token)
            navigate('/markets')
    }, [navigate, token])

    return (
        <>
            <Features />
            <About />
        </>
    )
}

export default Home
