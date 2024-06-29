import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import marketService from '../services/marketService';
import { InputWithRef, SubmitButton } from "../components"

// const inputFields = [{
//     type: 'text',
//     placeholder: 'Enter your title here...',
//     fieldName: 'title',
//     options: { required: 'Title is required' }
// }, {
//     type: 'number',
//     placeholder: 'Enter your Phone Number here...',
//     fieldName: 'phoneNum',
//     options: { required: 'Phone Number is required' }
// }]

function ProfileForm() {
    const user = useSelector(state => state.auth.userData);
    const token = useSelector(state => state.auth.userToken);
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state;

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token)
            navigate('/login')
    }, [navigate, token])

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: post?.title || '',
            phonenum: post?.phonenum || '',
            imageURL: post?.imageURL || " ",
            address: post?.address || '',
            lat: post?.location?.lat || 0,
            lng: post?.location?.lng || 0,
            description: post?.description || "",
            openingTime: post?.openingTime || '',
            closingTime: post?.closingTime || '',
            profession: post?.profession || ''
        }
    }); // Setup all the default values as empty values

    const submitHandler = async (data) => {
        try {
            setError('')
            if (post) {
                const res = await marketService.updateMarket(post._id, data, token);
                if (res) {
                    setMessage('Market Details Updated')
                    setTimeout(() => {
                        navigate('/myProfile')
                    }, 1000)
                }
            }
            else {
                const res = await marketService.createMarket(data, token);
                if (res) {
                    setMessage('New Market Created');
                    setTimeout(() => {
                        navigate('/myProfile')
                    }, 1000)
                }
            }
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className='space-y-3'>
                    {error && (<div className='flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
                        <h2 className='text-2xl font-semibold leading-7 text-black hover:bg-gray-100/50 hover:text-black/90 disabled:cursor-not-allowed disabled:opacity-50'>{error}</h2>
                    </div>)}
                    <InputWithRef
                        type="text"
                        label="Title"
                        placeholder='Enter your title here...'
                        {...register('title', {
                            required: 'Title is required'
                        })}
                    />
                    <InputWithRef
                        type='number'
                        label="Phone Number"
                        placeholder='Enter your phone number here...'
                        {...register('phonenum', {
                            required: 'Phone Number is required'
                        })}
                    />
                    <InputWithRef
                        type="text"
                        label="Image URL"
                        placeholder='Enter your image URL here...'
                        {...register('imageURL')}
                    />
                    <InputWithRef
                        type="text"
                        label="Address"
                        placeholder='Enter your address here...'
                        {...register('address')}
                    />
                    <InputWithRef
                        type="number"
                        label="Latitude"
                        placeholder='Enter your Latitude here...'
                        {...register('lat')}
                    />
                    <InputWithRef
                        type="number"
                        label="Longitude"
                        placeholder='Enter your Longitude here...'
                        {...register('lng')}
                    />
                    <InputWithRef
                        type="text"
                        label="Description"
                        placeholder='Enter your Description here...'
                        {...register('description')}
                    />
                    <InputWithRef
                        type="text"
                        label="Opening Time"
                        placeholder='Enter your Opening Time here...'
                        {...register('openingTime')}
                    />
                    <InputWithRef
                        type="text"
                        label="Closing Time"
                        placeholder='Enter your Closing Time here...'
                        {...register('closingTime')}
                    />
                    <InputWithRef
                        type="text"
                        label="Profession"
                        placeholder='Enter your Profession here...'
                        {...register('profession')}
                    />
                    <SubmitButton
                        type='submit'
                        btnText={post ? "Update Market" : "Create Market"}
                    />
                    {message && <div className="text-center text-sm text-green-500 mt-2">{message}</div>}
                </div>
            </form>
        </div>
    )
}

export default ProfileForm
