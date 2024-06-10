import React from 'react'

function SubmitButton() {
    return (
        <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/50 hover:text-white/90"
        >
            Get started <ArrowRight className="ml-2" size={16} />
        </button>
    )
}

export default SubmitButton
