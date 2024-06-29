import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { RatingStar, InputWithRef, SubmitButton } from '../components';
import marketService from '../services/marketService';

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

    const { register, handleSubmit, control } = useForm({
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
                        <InputWithRef
                            type='text'
                            placeholder="Enter your review text here..."
                            {...register('review', {
                                required: 'Review is required'
                            })}
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
                        <SubmitButton
                            type='submit'
                            btnText={currUserReview ? "Update Review" : "Add Review"}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
