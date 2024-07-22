import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import marketService from '../services/marketService';
import { InputWithRef, SubmitButton, Map } from "../components"

const inputFields = [
    {
        type: "text",
        label: "Title",
        placeholder: 'Enter your title here...',
        fieldName: 'title',
        options: {
            required: 'Title is required'
        }
    },
    {
        type: 'number',
        label: "Phone Number",
        placeholder: 'Enter your phone number here...',
        fieldName: 'phonenum',
        options: {
            required: 'Phone Number is required'
        }
    },
    {
        type: "text",
        label: "Image URL",
        placeholder: 'Enter your image URL here...',
        fieldName: 'imageURL',
    },
    {
        type: "text",
        label: "Address",
        placeholder: 'Enter your address here...',
        fieldName: 'address',
        readOnly: true
    },
    {
        type: "number",
        label: "Latitude",
        placeholder: 'Enter your Latitude here...',
        fieldName: 'lat',
        readOnly: true
    },
    {
        type: "number",
        label: "Longitude",
        placeholder: 'Enter your Longitude here...',
        fieldName: 'lng',
        readOnly: true
    },
    {
        type: "text",
        label: "Description",
        placeholder: 'Enter your Description here...',
        fieldName: 'description',

    },
    {
        type: "text",
        label: "Opening Time",
        placeholder: 'Enter your Opening Time here...',
        fieldName: 'openingTime',
    },
    {
        type: "text",
        label: "Closing Time",
        placeholder: 'Enter your Closing Time here...',
        fieldName: 'closingTime',
    },
    {
        type: "text",
        label: "Profession",
        placeholder: 'Enter your Profession here...',
        fieldName: 'profession',
    },
]

function ProfileForm() {
    const user = useSelector(state => state.auth);
    const token = useSelector(state => state.auth.userToken);
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state;

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            title: post?.title || '',
            phonenum: post?.phonenum || '',
            imageURL: post?.imageURL || " ",
            address: post?.address || '',
            lat: post?.location?.lat || user?.userLocation?.latitude || 0,
            lng: post?.location?.lng || user?.userLocation?.longitude || 0,
            description: post?.description || "",
            openingTime: post?.openingTime || '',
            closingTime: post?.closingTime || '',
            profession: post?.profession || ''
        }
    }); // Setup all the default values as empty values

    useEffect(() => {
        if (!token)
            navigate('/login')
    }, [navigate, token])

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
            <form onSubmit={handleSubmit(submitHandler)} className='w-full max-w-3xl'>
                <div className='space-y-3'>
                    {error && (<div className='flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
                        <h2 className='text-2xl font-semibold leading-7 text-black hover:bg-gray-100/50 hover:text-black/90 disabled:cursor-not-allowed disabled:opacity-50'>{error}</h2>
                    </div>)}

                    {
                        inputFields.map((inputField, index) => (
                            <InputWithRef
                                key={index}
                                type={inputField.type}
                                label={inputField.label}
                                placeholder={inputField.placeholder}
                                readOnly={inputField.readOnly}
                                {...register(inputField.fieldName, inputField.options)}
                            />
                        ))
                    }
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Location</label>
                        <Map
                            setValue={setValue}
                            watch={watch}
                            center={[user?.userLocation?.latitude || 0, user?.userLocation?.longitude || 0]}
                        />
                    </div>
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
