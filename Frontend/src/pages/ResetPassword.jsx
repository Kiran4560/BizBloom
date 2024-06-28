import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { ArrowRight } from 'lucide-react';

export default function ResetPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = React.useState('');

    const resetPasswordHandler = async (data) => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (!token) {
            setMessage('Invalid or missing token');
            return;
        }
        try {
            const response = await authService.resetPassword({ token, newPassword: data.password });
            if (response) {
                setMessage('Password reset successful');
                navigate('/login');
            }
        } catch (error) {
            setMessage('Failed to reset password');
            console.error(error);
        }
    };

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <h2 className="text-center text-2xl font-bold leading-tight ">
                        Reset Password
                    </h2>
                    <form onSubmit={handleSubmit(resetPasswordHandler)} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="password" className="text-base font-medium">
                                    {' '}
                                    New Password{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="New Password"
                                        id='password'
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 8,
                                                message: 'Password must be at least 8 characters'
                                            }
                                        })}
                                    ></input>
                                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/50 hover:text-white/90"
                                >
                                    Reset Password <ArrowRight className="ml-2" size={16} />
                                </button>
                            </div>
                            {message && <div className="text-center text-sm text-green-500 mt-2">{message}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
