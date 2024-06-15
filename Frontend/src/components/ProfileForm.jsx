import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import marketService from '../services/marketService';

const inputFieldStyle = "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50";

const submitButtonStyle = "inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/50 hover:text-white/90";

function ProfileForm() {
    const user = useSelector(state => state.auth.userData);
    const token = useSelector(state => state.auth.userToken);
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (token)
            setUserData(user);
        else {
            setUserData(null);
            navigate('/login');
        }
    }, [user, token])

    const { register, handleSubmit } = useForm({
        title: '',
        phonenum: '',
        imageURL: '',
        address: '',
        lat: "",
        lng: "",
        description: "",
        openingTime: '',
        closingTime: '',
        profession: ''
    }); // Setup all the default values as empty values

    const submitHandler = async (data) => {
        try {
            setError('')
            const res = await marketService.createMarket(data);
            if (res) {
                alert('New Market Created');
                navigate('/myProfile')
            }
        } catch (error) {
            setError(error);
        }
    }

    return (token) ? (
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className='space-y-3'>
                    <div>
                        {error && (<div className='flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
                            <h2 className='text-2xl font-semibold leading-7 text-black hover:bg-gray-100/50 hover:text-black/90 disabled:cursor-not-allowed disabled:opacity-50'>{error}</h2>
                        </div>)}
                        <input
                            type="text"
                            placeholder='Enter your title here...'
                            className={inputFieldStyle}
                            {...register('title', {
                                required: true
                            })}
                        />
                    </div>
                    <div>

                        <input
                            type='number'
                            placeholder='Enter your phone number here...'
                            className={inputFieldStyle}
                            {...register('phonenum', {
                                required: true
                            })}
                        />
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder='Enter your imageurl here...'
                            className={inputFieldStyle}
                            {...register('imageURL')}
                        />
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder='Enter your address here...'
                            className={inputFieldStyle}
                            {...register('address')}
                        />
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder='Enter your Latitude here...'
                            className={inputFieldStyle}
                            {...register('lat')}
                        />
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder='Enter your Longitude here...'
                            className={inputFieldStyle}
                            {...register('lng')}
                        />
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder='Enter your Description here...'
                            className={inputFieldStyle}
                            {...register('description')}
                        />
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder='Enter your Opening Time here...'
                            className={inputFieldStyle}
                            {...register('openingTime')}
                        />
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder='Enter your Closing Time here...'
                            className={inputFieldStyle}
                            {...register('closingTime')}
                        />
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder='Enter your Profession here...'
                            className={inputFieldStyle}
                            {...register('profession')}
                        />
                    </div>

                    <div>
                        <button
                            type='submit'
                            className={submitButtonStyle}
                        >
                            Create Market <ArrowRight className="ml-2" size={16} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    ) : (
        <div className='flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
            <h2 className='text-2xl font-semibold leading-7 text-black hover:bg-gray-100/50 hover:text-black/90 disabled:cursor-not-allowed disabled:opacity-50'>Login to your account...</h2>
        </div>
    )
}

export default ProfileForm
