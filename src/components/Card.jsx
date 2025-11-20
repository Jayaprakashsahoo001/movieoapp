import React from 'react'
import { useSelector } from 'react-redux'
import moment from "moment";
import { Link } from 'react-router-dom'


const Card = ({ data, trending, index, media_type }) => {
    const imageURL = useSelector(state => state.movieoData.imageURL)

    const mediaType = data.media_type ?? media_type

    return (
        <Link to={"/" + mediaType + "/" + data.id} className='w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded  group relative box hover:scale-101 transition-all'>

            {
                data?.poster_path ? (
                    <img
                        src={imageURL + data?.poster_path}
                    />
                ) : (
                    <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>
                        No image found
                    </div>
                )
            }



            <div className='absolute top-4'>
                {
                    trending && (
                        <div className='py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden'>
                            #{index} Trending
                        </div>
                    )
                }
            </div>

            <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2 box_content transition-[bottom] duration-.5s group-hover:bottom-[6px]'>
                <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>
                    {data?.title || data?.name}
                </h2>
                <div className='text-sm flex justify-between'>
                    <p>{moment(data?.release_date || data?.first_air_date).format("MMM Do YY")}</p>
                    <p>Rating : {Number(data.vote_average).toFixed(1)}</p>
                </div>

            </div>



        </Link>
    )
}

export default Card
