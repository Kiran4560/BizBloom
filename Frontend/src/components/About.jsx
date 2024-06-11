import React from 'react'

export default function About() {
    const teamList = [
        {
            imgSrc: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
            name: "John Doe",
            role: "Frontend Developer"
        },
        {
            imgSrc: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
            name: "Mark Cook",
            role: "Backend Developer"
        },
        {
            imgSrc: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
            name: "Ketty",
            role: "Designer"
        }
    ]

    return (
        <div className="mx-auto max-w-7xl px-2 md:px-0 my-10">
            <div className="my-4 text-center">
                <h1 className="text-3xl font-bold">Our Team</h1>
                <p className="mt-2 text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
                {teamList.map((item) => (
                    <div className="flex flex-col items-center text-start" key={item.name}>
                        <div
                            className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
                            style={{
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <img
                                src={item.imgSrc}
                                alt={item.name}
                                className="z-0 h-full w-full rounded-[10px] object-cover"
                            />
                            <div className="absolute bottom-4 left-4">
                                <h1 className="text-xl font-semibold text-white">{item.name}</h1>
                                <h6 className="text-base text-white">{item.role}</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
