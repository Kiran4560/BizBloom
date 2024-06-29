import { ArrowRight } from 'lucide-react'
import React from 'react'

function SubmitButton({
    btnText = '',
    type = 'submit',
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            className={`${className} inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/50 hover:text-white/90`}
        >
            {btnText} <ArrowRight className="ml-2" size={16} />
        </button>
    )
}

export default SubmitButton
