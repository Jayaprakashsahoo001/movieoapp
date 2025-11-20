import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import useFetchDetails from '../hooks/useFetchDetails'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Divider from '../components/Divider'
import HorizontalScrollCard from '../components/HorizontalScrollCard'

function DetailPage() {

  const params = useParams()
  const imageURL = useSelector(state => state.movieoData.imageURL)
  const { data } = useFetchDetails(`https://api.themoviedb.org/3/${params?.explore}/${params?.id}?api_key=9d2df73bb12e1429b9a048dc7e43c1fc`)
  const { data: castData } = useFetchDetails(`https://api.themoviedb.org/3/${params?.explore}/${params?.id}/credits?api_key=9d2df73bb12e1429b9a048dc7e43c1fc`)
  const { data: similarData } = useFetch(`https://api.themoviedb.org/3/${params?.explore}/${params?.id}/similar?api_key=9d2df73bb12e1429b9a048dc7e43c1fc`)
  const { data: RecommendationData} = useFetch(`https://api.themoviedb.org/3/${params?.explore}/${params?.id}/recommendations?api_key=9d2df73bb12e1429b9a048dc7e43c1fc`)


  console.log("data", data);
  console.log("star cast", castData);


  const duration = (data?.runtime / 60 || data?.number_of_episodes / 60)?.toFixed(1)?.split(".")


  return (
    <div>
      <div className='w-full h-[280px] relative hidden lg:block '>
        <div className='h-full w-full '>
          <img
            src={imageURL + data?.backdrop_path || imageURL + data?.poster_path}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='absolute h-full w-full top-0 bg-gradient-to-t  from-neutral-900/90 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className=' relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
          <img
            src={imageURL + data?.poster_path}
            className='h-80 w-65 object-cover rounded'
          />
        </div>

        <div className='relative w-full h-full '>
          <h2 className='text-2xl lg:text-4xl font-bold text-white'>{data?.title || data?.original_name}</h2>
          <p className='text-neutral-400'>{data?.tagline}</p>

          <Divider />

          <div className='flex items-center  gap-3'>
            <p>
              Rating : {Number(data?.vote_average).toFixed(1)}
            </p>
            <span> | </span>
            <p>
              View : {Number(data?.vote_count)}
            </p>
            <span> | </span>
            <p>Duration : {duration[0]}h {duration[1]}m</p>
          </div>
          <Divider />
          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{data?.overview}</p>

            <Divider />

            <div className='flex items-center gap-3 my-3 text-center'>
              <p>Status : {data?.status}</p>
              <span> | </span>
              <p>Release Date : {moment(data?.release_date).format("MMMM Do YYYY")}</p>
              <span> | </span>
              <p>Revenue : {Number(data?.revenue)}</p>
            </div>
            <Divider />
          </div>

          <div>
            <p><span className='text-white' >Language</span> : {data?.original_language}</p>

          </div>

          <Divider />
          <h2 className='font-bold text-lg mb-2'>Cast :</h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 mx-2.5 lg:mx-0'>
            {
              castData?.cast?.filter(el => el?.profile_path)?.map((cast, index) => {
                return (
                  <div>
                    <div>
                      <img
                        src={imageURL + cast?.profile_path}
                        className='w-24 h-24 object-cover rounded-full'
                      />
                    </div>
                    <p className='font-bold text-center text-sm text-neutral-400'>{cast?.original_name}</p>
                  </div>
                )
              })
            }
          </div>


        </div>
      </div>

      <div>
        <HorizontalScrollCard data={similarData} heading={"Similar " + params?.explore} media_type={params?.explore} />
        <HorizontalScrollCard data={RecommendationData} heading={"Recommendation " + params?.explore} media_type={params?.explore} />
            
      </div>

    </div>
  )
}

export default DetailPage

