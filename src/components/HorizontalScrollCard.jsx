import React from 'react'
import Card from './Card'
import { useRef } from 'react';
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

function HorizontalScrollCard({ data = [], heading, trending, media_type}) {

    const containerRef = useRef()

    const handelNext = () => {
        containerRef.current.scrollLeft += 300
    }

    const handelPrevious = () => {
        containerRef.current.scrollLeft -= 300
    }

    return (

        <div className='container mx-auto px-3 my-10'>
            <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>{heading}</h2>

            <div className='relative'>
                <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll overflow-hidden relative z-10 scroll-smooth transition-all scrollbar-none'>
                    {
                        data.map((data, index) => {
                            return (
                                <Card key={data.id + "heading" + index} data={data} index={index + 1} trending={trending} media_type={media_type}/>
                            )
                        })
                    }
                </div>

                <div className='absolute top-0 hidden lg:flex justify-between w-full items-center h-full'>
                    <button onClick={handelPrevious} className='bg-white p-1 text-black rounded-full -ml-2 z-10'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handelNext} className='bg-white p-1 text-black rounded-full -mr-1 z-10'>
                        <FaAngleRight />
                    </button>
                </div>

            </div>

        </div>

    )
}

export default HorizontalScrollCard
