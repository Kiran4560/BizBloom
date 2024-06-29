import React, { forwardRef } from 'react'

const InputWithRef = forwardRef(({
    className = '',
    type = 'text',
    label,
    ...props
}, ref) => {
    return (
        <div className="flex flex-col space-y-1">
            {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
            <input
                ref={ref}
                type={type}
                className={`${className ? className : 'w-full'} flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                {...props}
            />
        </div>
    )
})

export default InputWithRef
