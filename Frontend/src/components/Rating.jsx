import { ArrowRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { RatingStar } from './index';
import marketService from '../services/marketService';

const inputFieldStyle = "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50";

const submitButtonStyle = "inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/50 hover:text-white/90";

export default function Rating() {
    const location = useLocation();
    const navigate = useNavigate();
    const { _id, title, imageURL, avgRating, reviews } = location.state;

    const userData = useSelector(state => state.auth.userData); // {name,email,favourites,userId}
    const token = useSelector(state => state.auth.userToken);

    useEffect(() => {
        if (!token)
            navigate('/login')
    }, [navigate, token])

    const [error, setError] = useState('');
    // reviews ==> [{user: __userId__ , rating: __number__ , review: __reviewMsg__ , _id : __ratingId__ }, {}, {} , ...]
    const currUserReview = reviews.filter(({ user, rating, review, _id }) => user === userData.userId)[0]; // {user,rating,review,_id}
    console.log(currUserReview);

    const { handleSubmit, control } = useForm({
        defaultValues: {
            rating: currUserReview?.rating || 0,
            review: currUserReview?.review || '',
        }
    })

    const ratingRef = useRef();

    const submitHandler = async ({ rating, review }) => {
        try {
            setError('');
            // console.log(rating);
            // console.log(review);
            const marketId = _id;
            const res = await marketService.reviewMarket(marketId, token, rating, review);
            if (res)
                navigate('/markets');

        } catch (error) {
            setError(error);
        }
    }

    return (
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className='space-y-3'>
                    <div>
                        {error && (<div className='flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
                            <h2 className='text-2xl font-semibold leading-7 text-black hover:bg-gray-100/50 hover:text-black/90 disabled:cursor-not-allowed disabled:opacity-50'>{error}</h2>
                        </div>)}
                        <Controller
                            name="review"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    placeholder='Enter your review text here...'
                                    className={inputFieldStyle}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label>
                            <Controller
                                name="rating"
                                control={control}
                                render={({ field }) => (
                                    <RatingStar ref={ratingRef} {...field} />
                                )}
                            />
                        </label>
                    </div>
                    <div>
                        <button
                            type='submit'
                            className={submitButtonStyle}
                        >
                            {currUserReview ? "Update Review" : "Add Review"} <ArrowRight className="ml-2" size={16} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
