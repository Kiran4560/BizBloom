import React from 'react'

export default function Input({
    className = '',
    type = 'text',
    ...props
}) {
    return (
        <input
            type={type}
            className={`${className ? className : 'w-full'} flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
            {...props}
        />
    )
}
