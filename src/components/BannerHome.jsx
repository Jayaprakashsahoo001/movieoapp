import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { useState } from 'react';

function BannerHome() {

  const bannerData = useSelector(state => state.movieoData.bannerData)
  const imageURL = useSelector(state => state.movieoData.imageURL)
  const [CurrentImage, setCurrentImage] = useState(0)

  const handelNext = () => {
    if (CurrentImage < bannerData.length - 1) {
      setCurrentImage(preve => preve + 1)

    }
  }
  const handelPrevious = () => {
    if (CurrentImage > 0) {
      setCurrentImage(preve => preve - 1)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (CurrentImage < bannerData.length - 1) {
        handelNext()
      } else {
        setCurrentImage(0)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [bannerData, imageURL, CurrentImage])

  return (
    <section className='w-full h-full'>
      <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
        {
          bannerData.map((data, index) => {
           

            return (
              <div key={data.id + "bannerHome" + index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all' style={{ transform: `translateX(-${CurrentImage * 100}%)` }}>
                <div className='w-full h-full'>
                  <img
                    src={imageURL + data.backdrop_path}
                    className='h-full w-full object-cover'
                  />
                </div>

                <div className='absolute top-0 w-full h-full hidden lg:flex items-center justify-between px-4 group-hover:lg:flex'>
                  <button onClick={handelPrevious} className='bg-white p-1 rounded-full text-2xl z-10 text-black '>
                    <FaAngleLeft />
                  </button>
                  <button onClick={handelNext} className='bg-white p-1 rounded-full text-2xl z-10 text-black '>
                    <FaAngleRight />
                  </button>
                </div>

                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>
                </div>

                <div className='container mx-auto'>
                  <div className=' w-full absolute bottom-0 max-w-md px-3'>
                    <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{data.title || data.original_name}</h2>
                    <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                    <div className='flex items-center gap-3 font-bold'>
                      <p className='font-bold truncate'>Rating : {Number(data.vote_average).toFixed(1)}</p>
                      <span>|</span>
                      <p> Language : {data.original_language}</p>
                      <span>|</span>
                      <p>Viwes : {data.id}</p>
                    </div>
                    <button className='bg-white px-4 py-2 text-black font-bold rounded my-5 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                      Play Now
                    </button>

                  </div>
                </div>



              </div>
            )
          })
        }
      </div>
    </section >
  )
}

export default BannerHome
